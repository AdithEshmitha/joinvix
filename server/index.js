//IMPORT LIBARIES AND PACKAGES
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import databaseConnection from './config/database.js'
import channelRoutes from './routes/channelRoute.js'
import authRoute from './routes/authRoute.js'

// CONFIG DOTENV
dotenv.config()

// INITIALIZATION VAIABLES
const PORT = process.env.PORT || 5000

// CREATE EXPRESS APP
const app = express()

// API's
app.use(cors())
app.use(bodyParser.json())

// API ENDPOINTS
app.use('/api/channels', channelRoutes)
app.use('/api/auth', authRoute)

// CONFIG DATABASE
databaseConnection()

// CHECK API
app.get('/', (req, res) => {
    res.send('JOINVIX API is running!')
})

// RUN APP
app.listen(PORT, () => {
    console.log(`[+] Server started on port : ${PORT}`)
})