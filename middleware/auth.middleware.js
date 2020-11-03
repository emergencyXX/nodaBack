const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    if (req.method === 'OPTIONS') {
        return next()
    }

    try {

        const token = req.cookies.access_token.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: 'Unauthorized...'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: 'Unauthorized...'})
    }
}
