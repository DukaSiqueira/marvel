const User = require('../models/user')
const validator = require("validator")

function validateId(req, res, next) {
    const id = req.params.id
    if (!id || !Number(id)) {
        res.status(400).json({ error: "Invalid id format" })
    }
    next()
} 

async function validateLogin(req, res, next) {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ error: "Missing required fields" })
    } else if (!validateEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" })
    }
    next()
}

function validateEmail(email) {
    return validator.isEmail(email)
}

async function validateCreateUser(req, res, next) {
    const { name, email, birth_date, password } = req.body
    if (!name || !email || !birth_date || !password) {
        return res.status(400).json({ error: "Missing required fields" })
    } else if (!validateEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" })
    }

    if (password.length < 8 ) {
        return res.status(400).json({ error: "Password must have more than 8 characters" })
    }

    const user = await User.findOne({
        where: {
            email: email
        }
    })

    if (user) {
        return res.status(400).json({ error: "Email is already associated with an account" })
    }

    next()
}

module.exports = {
    validateCreateUser,
    validateId,
    validateLogin
}