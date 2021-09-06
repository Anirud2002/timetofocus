const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const path = require('path')

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
require('dotenv').config();

//  BodyParser
app.use(express.urlencoded({extended: true}))



// connect to db
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
.then(() => console.log('mongo db connected'))
.catch(err => console.log(err))

// express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// Passport
app.use(passport.initialize())
app.use(passport.session())

// passport config
require("./config/passport")(passport)

// Connect flash
app.use(flash())

// Global vars
app.use((req, res, next) => {
    res.locals.error = req.flash('error')
    next()
})

// routes
app.use("/users", require("./routes/users"))

// serve the static assests if in production
if(process.env.NODE_ENV === 'production'){
    // set a static folder
    app.use(express.static('../build'))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


app.listen(port, () => {
    console.log("Server started on port:" + port)
})