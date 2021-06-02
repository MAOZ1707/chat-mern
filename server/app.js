const express = require('express')
const path = require('path')
const morgan = require('morgan')
const AppError = require('./utils/appError')
const cors = require('cors')
const chalk = require('chalk')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const app = express()
// const httpServer = require('http').createServer(app)
// const io = require('socket.io')(httpServer, {cors: {origin: '*'}})

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

// connect to database
require('./config/database')

// Routes
const usersRouter = require('./router/userRouter')
const roomsRouter = require('./router/roomsRouter')
const messagesRouter = require('./router/messagesRouter')

app.use('/users', usersRouter)
app.use('/rooms', roomsRouter)
app.use('/messages', messagesRouter)

// read build file
app.use('/', express.static(path.join(__dirname, '../client/build')))

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// Error handling middleware
app.use((err, req, res, next) => {
	console.log(chalk.redBright(err.stack))

	err.statusCode = err.statusCode || 500
	err.status = err.status || 'error'

	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	})
})

// server
let port = 5000
if (process.env.PORT) {
	port = process.env.PORT
}

app.listen(port, () => {
	console.log(chalk.magentaBright(`App running on port ${port}`))
})
