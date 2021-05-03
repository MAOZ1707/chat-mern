const dotenv = require('dotenv')
const mongoose = require('mongoose')
const chalk = require('chalk')
require('dotenv').config()
dotenv.config({path: '../config.env'})

let dbUrl = process.env.DB_URL

if (process.env.DB_URL) {
	dbUrl = process.env.DB_URL
}

mongoose
	.connect(dbUrl, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log(chalk.green.bold('DB connection successful!!'))
	})
	.catch((err) => console.log(err, chalk.red.bold('DB connection failed!!')))

module.exports = mongoose
