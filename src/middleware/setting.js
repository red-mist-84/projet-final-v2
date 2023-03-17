

export default function setting (req, res, next){
    res.locals.message = null
    res.locals.user = null
    next()
}

export function isSessionActive(res, req, next){
  if(req.session && req.session.sessid){
    res.redirect("/")
  }
  else{
    next()
}
}