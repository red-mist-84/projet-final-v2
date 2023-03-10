import { v4 as uuidv4 } from 'uuid';
import { getPoolConnexion } from '../../config/database.js';
import signature from 'cookie-signature';
/*import roleRepository from '../repositories/roleRepository.js';*/

// middleware permettant de tenter de connecter l'utilisateur
// si l'utilisateur est connecté, donnera accès aux prochains middleware
// à la session via `req.auth` et dans les templates via `auth`
export async function tryAuthentication (req, res, next) {
  req.auth = {
    authenticated: false,
    user: null,
    sessid: null,
    signedSessid: null
  };

  // pour dans les templates
  res.locals.user = null;

  const sessid = req.cookies.sessid;

  // vérifie si le cookie sessid existe si n'existe pas, continue
  if (!sessid) {
    return next();
  }

  const unsigned = signature.unsign(sessid, process.env.SECRET);
  // Récupères les informations de session correspondant à un sessid (si existe)
  const loggedUser = await getSession(res, unsigned);

  // si null, la session en db n'existe pas ou est expirée
  if (!loggedUser) {
    // on supprime le cookie
    await clearSession(res, sessid);

    res.redirect('/login');
  } else {
    // sera accessible dans les prochains middlewares
    req.auth = {
      authenticated: true,
      user: loggedUser,
      sessid: unsigned,
      signedSessid: sessid
    };

    // sera accessible dans les templates
    res.locals.user = loggedUser;
    next();
  }
}

export async function createSession (res, user) {
  const roles = await roleRepository
    .findUserRoles(user.id)

  console.log(roles);

  user.roles = roles.map(r => r.name);

  // Nous définissons un identifiant unique
  const uuid = uuidv4();
  // ainsi qu'une date d'expiration
  const expiresAt = createExpirationDate(process.env.SESS_EXPIRATION);

  // Création d'une table en base de donnée pour représenter l'utilisateur connecté sur notre serveur
  await getPoolConnexion()
    .query('INSERT INTO sessions VALUES (?,?,?)', [
      uuid,
      JSON.stringify(user),
      expiresAt
    ]);

  // Nous ignons le cookie, afin de s'assurer que l'uuid a été généré depuis notre site
  const signed = signature.sign(uuid, process.env.SECRET);

  // Nous terminons par l'écriture du header `Set-Cookie`, permettant d'indiquer au navigateur
  // que l'on souhaite qu'il nous renvoie ce cookie à chaque requête
  // https://developer.mozilla.org/fr/docs/Web/HTTP/Cookies
  setCookie(res, signed, expiresAt);
}

export async function clearSession (res, sessid) {
  await getPoolConnexion()
    .query('DELETE FROM sessions WHERE sessid = ?', [sessid]);

  removeCookie(res, sessid);
}

export function removeCookie (res, sessid) {
  const signed = signature.sign(sessid, process.env.SECRET);

  res.header('Set-Cookie', `sessid=${signed};Max-Age=0`);
}

export async function getSession (res, sessid) {
  const [sessions] = await getPoolConnexion()
    .query('SELECT * FROM sessions WHERE sessid = ?', [sessid]);

  if (sessions.length === 0) {
    return null;
  }

  if (sessions[0].expiresAt < new Date()) {
    await getPoolConnexion()
      .query('DELETE FROM sessions WHERE sessid = ?', [sessid]);

    return null;
  }

  const expiresAt = createExpirationDate(process.env.SESS_EXPIRATION);

  // on repousse la date d'expiration tant que l'utilisateur est connecté
  // et fait des requêtes sur le serveur
  await getPoolConnexion()
    .query('UPDATE sessions SET expires_at = ? WHERE sessid = ?', [
      expiresAt,
      sessid
    ]);

  const signed = signature.sign(sessid, process.env.SECRET);

  // On met également à jour la date d'expiration du cookie
  setCookie(res, signed, expiresAt);

  return JSON.parse(sessions[0].content);
}

export function getSessionCookie (req) {
  const signed = req.cookies.sessid;
  if (!signed) {
    return null;
  }

  return signature.unsign(signed, process.env.SECRET);
}

export async function getSessionOrNull (req, res) {
  const sessid = req.cookies.sessid;
  if (!sessid) {
    return null;
  }

  const unsigned = signature.unsign(sessid, process.env.SECRET);

  return await getSession(res, unsigned);
}

// Supprime toutes les session expirées en base de données
export function clearExpiredSessions () {
  getPoolConnexion()
    .query('DELETE FROM sessions WHERE expires_at < NOW()');
}

function createExpirationDate (expiration) {
  const date = new Date();

  date.setMinutes(date.getMinutes() + Number(expiration));

  return date;
}

function setCookie (res, signedSessid, expiresAt) {
  res.header('Set-Cookie', `sessid=${signedSessid};Expires=${expiresAt.toUTCString()};HttpOnly;Secure;Path=/;`);
}