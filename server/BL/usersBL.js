const Users = require('../model/usersModel')

exports.getUsers = () => {
	return new Promise((resolve, reject) => {
		Users.find({}, (err, users) => {
			if (err) {
				reject(err)
			} else {
				let shapedUsers = users.map((user) => {
					return user
				})
				resolve(shapedUsers)
			}
		})
	})
}

exports.getUser = (userId) => {
	return new Promise((resolve, reject) => {
		if (!userId) {
			reject('please provide id')
		}

		Users.findById({_id: userId}, (err, user) => {
			if (err) {
				reject(err)
			} else {
				resolve(user)
			}
		})
	})
}
