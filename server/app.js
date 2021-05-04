const express = require('express')
const morgan = require('morgan')
const AppError = require('./utils/appError')
const cors = require('cors')
const chalk = require('chalk')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const {generateMessage} = require('./utils/generateMessage')

const app = express()
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer, {cors: {origin: '*'}})

app.use(cors({origin: true, credentials: true}))
app.use(express.json())
app.use(morgan('dev'))

// connect to database
require('./config/database')

// Routes
const usersRouter = require('./router/userRouter')
const roomsRouter = require('./router/roomsRouter')

app.use('/users', usersRouter)
app.use('/rooms', roomsRouter)

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

io.on('connection', (socket) => {
	//  user has joined
	socket.emit('message', generateMessage('welcome'))
	socket.broadcast.emit('message', generateMessage('new user has joined'))

	//  send message
	socket.on('sendMessage', (data) => {
		io.emit('message', generateMessage(data))
	})

	//  user left the chat
	socket.on('disconnect', () => {
		io.emit('message', generateMessage('user left'))
	})
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

httpServer.listen(port, () => {
	console.log(chalk.magentaBright(`App running on port ${port}`))
})
