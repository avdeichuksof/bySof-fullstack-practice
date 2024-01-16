export function isUser(req, res, next) {
    if(req.user.role === 'user') return next()
    res.status(401).send({error: 'Auth error, please try again'})
}

export function isAdmin(req, res, next) {
    if(req.user.role === 'admin') return next()

    res.status(403).send({error: 'ADMINS ONLY, permission required'})
}