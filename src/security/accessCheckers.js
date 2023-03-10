export default {
  isLogged,
  isNotLogged,
  isLoggedAsAdmin
};

async function isLogged (req, res, next) {
  if (!req.auth.authenticated) {
    return res.redirect('/login');
  }

  next();
}

async function isLoggedAsAdmin (req, res, next) {
  if (!req.auth.authenticated) {
    return res.redirect('/login');
  }

  if (!req.auth.user.roles.includes('ROLE_ADMIN')) {
    return res.redirect('/');
  }

  next();
}

async function isNotLogged (req, res, next) {
  // si il y a un cookie et si il y a une session, je redirige
  if (req.auth.authenticated) {
    return res.redirect('/admin');
  }

  next();
}
