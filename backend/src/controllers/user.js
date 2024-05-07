const { getAllUsers, getUserById, insertUser, updateUser, deleteUser } = require('../services/user')

function findAll(req, res) {
    try {
        getAllUsers().then( (result) => res.json(result) );
    } catch (error) {
        res.status(500)
        res.send(error.message)  
    }
}

function findById(req, res) {
    try {
        const id = req.params.id
        getUserById(id).then( (result) => res.json(result) );
    } catch (error) {
        res.status(500)
        res.send(error.message)  
    }
}

function createUser(req, res) {
    try {
        const user = req.body
        insertUser(user).then( (result) => res.status(201).json(result) );
    } catch (error) {
        res.status(500)
        res.send(error.message)  
    }
}

function patchUser(req, res) {
    try {
        const id = req.params.id
        const user = req.body
        updateUser(id, user).then( (result) => res.status(200).json(result) );
    } catch (error) {
        res.status(500)
        res.send(error.message)  
    }
}

function destroyUser(req, res) {
    try {
        const id = req.params.id
        deleteUser(id)
        res.send("User successfully deleted")
    } catch (error) {
        res.status(500)
        res.send(error.message)  
    }
}

function login() {
    res.send('login')
}

module.exports = {
    findAll,
    findById,
    createUser,
    patchUser,
    destroyUser,
    login
}