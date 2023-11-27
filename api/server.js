// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')

const server = express()
server.use(express.json())


server.put('/api/users/:id', async (req, res) => {

    try {
        const possibleUser = await Users.findById(req.params.id)
        if (!possibleUser) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            if (!req.body.name || !req.body.bio) {
                res.status(400).json({
                    message: 'Please provide name and bio for the user',
                })
            } else {
               const changingUser = await Users.update(
                req.params.id, 
                req.body)
               res.status(200).json(changingUser)
            }
        }
    } catch (err) {
        res.status(500).json({
             message: 'error updating user', 
             err: err.message,
             stack: err.stack,
    })
    }
})

server.delete('	/api/users/:id', async (req, res) => {
  try {
    const possibleUser = await Users.findById(req.params.id)
    if (!possibleUser) {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
    } else {
        const deletedUser = await Users.remove(possibleUser.id)
        res.status(200).json(deletedUser)
    }
  } catch (err) {
    res.status(500).json({ message: "The user information could not be modified" })
  }
})


server.post('/api/users', (req, res) => {
    const user = req.body
    Users.insert(user)
    if (!user.name || !user.bio) {
        res.status(400).json({ message: 'Please provide name and bio for the user'})
    } else {
      Users.insert(user)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error while saving the user to the database" })
        })
    }  
})

server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved"  })
        })
})


server.get('/api/users/:id', (req, res) => {
    const { id } = req.params

    Users.findById(id) 
        .then(user => {
            user
             ? res.status(200).json(user)
             : res.status(404).json({ message: "The user with the specified ID does not exist"  })
        })
        .catch(err => {
            res.status(500).json({ message: "The user information could not be retrieved" })
        })
})


server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

module.exports =  server  // EXPORT YOUR SERVER instead of {}
