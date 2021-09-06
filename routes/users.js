const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

// User model
const User = require('../models/User')

router.post('/register', (req,res) => {
    const {username, email, password, password2} = req.body
    console.log(username, email, password)
    User.findOne({email})
    .then(user => {
        if(user){
            res.json({error: true, msg: "Email is already registered"})
        }
        else{
            const newUser = new User({
                username,
                email,
                password
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash
                    newUser.save()
                })
            })
        }
    })
})

router.get('/loggedin', (req, res) => {
    if(req.user){
        console.log('yea boi')
        res.json({user: req.user.username})
    }
    else{
        res.json({msg: 'lund'})
    }
})

router.post('/login', (req, res, next) => {
    console.log(req.body)
    passport.authenticate('local', (err, user, info) => {
        if(err) throw err
        if(!user) {
            res.json({error: true, msg: "Email or password incorrect!"})
        }
        else{
            res.json({authenticated: true, user})
            console.log("done")
        }

    })(req, res, next)
})

router.get('/logout', (req, res) => {
    req.logOut()
    res.json({isLoggedOut: true})
})



module.exports = router