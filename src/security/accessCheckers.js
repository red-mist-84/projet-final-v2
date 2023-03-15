export default {
  isLogged,
  isNotLogged,
};

async function isLogged (req, res, next) {
  if (!req.auth.authenticated) {
    return res.redirect('/');
  }

  next();
}

async function isNotLogged (req, res, next) {
  // si il y a un cookie et si il y a une session, je redirige
  if (req.auth.authenticated) {
    return res.redirect('/');
  }

  next();
}
