// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')

const server = express()

server.use(express.json())

server.get('/api/users', (req, res) => {
    Users.findAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params

    Users.findById(id) 
        .then(user => {
            user
             ? res.status(200).json(user)
             : res.status(404).json({ message: `no user with id ${id}` })
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})

server.post('/api/users', async (req, res) => {
    const user = req.body
    try {
        const newUser = await Users.create(user)
        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

server.put('/api/users/:id', async (req, res) => {
    const changes = req.body
    const { id } = req.params

    try {
        const updatedUser = await Users.update(id, changes)
        if (updatedUser) {
            res.status(200).json(updatedUser)
        } else {
            res.status(404).json({ message: `user not found with id ${id}` })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

server.delete('	/api/users/:id', (req, res) => {
    const { id } = req.params

    Users.delete(id)
      .then(deleted => {
        if (deleted) {
            res.status(200).json(deleted)
        } else {
            res.status(404).json({ message: `user not found with id ${id}`})
        }
      }) 
      .catch(err => {
        res.status(500).json({ error: err.message })
      })
})

module.exports = {}; // EXPORT YOUR SERVER instead of {}
