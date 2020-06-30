const { verifyJwt } = require('../helpers/jwt')
const { getMessage } = require('../helpers/messages')

const checkJwt = (req, res, next) => {

    let token = req.headers['authorization']
    token = token ? token.slice(7, token.length) : null

    if (!token) {
        return res.jsonUnauthorized({ msg: getMessage('jwt.invalidToken') })
    }

    try {
        const decodedToken = verifyJwt(token)
        req.accountId = decodedToken.id
        // console.log('Toker expires in: ' + new Date(decodedToken.exp * 1000).toString())
        next()
    } catch {
        return res.jsonUnauthorized({ msg: getMessage('jwt.invalidToken') })
    }

    // req.accountId = 8

    // next()

}

module.exports = checkJwt

