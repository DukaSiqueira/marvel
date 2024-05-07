const { where } = require('sequelize')
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

async function getAllUsers() {
    return await User.findAll()
}

async function getUserById(id) {
    return await User.findByPk(id)
}

async function insertUser(user) {
    return await User.create({
        name: user.name,
        email: user.email,
        birth_date: user.birth_date,
        password: await bcrypt.hash(user.password, 10)
    })
}

async function updateUser(id, user) {
    const updateFields = {
        ...(user.name && { name: user.name }),
        ...(user.email && { email: user.email }),
        ...(user.birth_date && { birth_date: user.birth_date }),
        ...(user.password && { password: await bcrypt.hash(user.password, 10) })
    };

    await User.update(updateFields, {
        where: {
            id: id
        }
    })

    return getUserById(id)
}

async function deleteUser(id) {
    await User.destroy({
        where: {
            id: id
        }
    })
}

async function login(email, password) {
    const user = await User.findOne({ where: {email: email} })

    if (!user) { 
        const error = new Error('User not found')
        error.status = 404
        throw error
     }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) { 
        const error = new Error('Incorrect email and password combination')
        error.status = 400
        throw error
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ,{
        expiresIn: 3600
    })

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    insertUser,
    updateUser,
    deleteUser,
    login
}