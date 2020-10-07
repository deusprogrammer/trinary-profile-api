import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import bodyparser from 'body-parser'
import cors from 'cors'
import passport from 'passport'

import userRoutes from './api/routes/userRoutes'
import {jwtAuthStrategy} from './api/config/passportConfig'

let app = express()
let port = process.env.PORT || 8080

// Mongoose instance connection url connection
var databaseUrl = process.env.DB_URL
mongoose.Promise = global.Promise
mongoose.connect(databaseUrl)

passport.use(jwtAuthStrategy)

app.use(morgan('tiny'))
app.use(bodyparser.json())
app.use(cors())
app.use(passport.initialize())

// Apply routes
app.use("/users", passport.authenticate("jwt", { session: false }), userRoutes)

app.listen(port)
console.log('budget RESTful API server started on: ' + port)
