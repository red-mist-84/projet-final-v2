export function renderHttp404 (res, message = "La resource n'existe pas") {
  renderHttpError(res, 'warning', 404, "L'article n'existe pas");
}

export function renderHttpError (res, alert, statusCode, message) {
  res.statusCode = statusCode;

  res.render('_components/http-error.html', { alert, statusCode, message });
}
