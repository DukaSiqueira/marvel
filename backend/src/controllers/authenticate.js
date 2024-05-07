const { login } = require('../services/user')

function signUp(req, res) {
    try {
        const { email, password } = req.body
        return login(email, password)
            .then( (result) => res.json(result) )
            .catch( (error) => res.status(error.status).send(error.message));
    } catch (error) {
        res.status(500)
        res.send(error.message)  
    }
}

module.exports = {
    signUp
}