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

		Users.findById({ _id: userId }, (err, user) => {
			if (err) {
				reject('Could not find user')
			} else {
				resolve(user)
			}
		})
	})
}

exports.findFriend = (email) => {
	return new Promise((resolve, reject) => {
		if (!email) {
			reject('please provide user email')
		}

		Users.findOne({ email: email }, (err, user) => {
			if (err) {
				reject('Could not find user with provided email')
			} else {
				resolve(user)
			}
		})
	})
}

exports.addFriend = (friend, admin) => {
	return new Promise(async (resolve, reject) => {
		// check friend
		let existingUser = await Users.findOne({ email: friend.email })
		if (!existingUser) reject('Could not find user with that email')

		// add friend to user list
		Users.findByIdAndUpdate(
			admin.userId,
			{
				$push: { friends: { name: existingUser.name, email: existingUser.email } },
			},
			(err, data) => {
				if (err) {
					reject(err)
				} else {
					Users.findByIdAndUpdate(
						existingUser._id,
						{
							$push: { friends: { name: data.name, email: data.email } },
						},
						(err, data) => {
							if (err) reject(err)
							resolve(data)
						}
					)
				}
			}
		)
	})
}

exports.loadUserFriends = (userId) => {
	return new Promise((resolve, reject) => {
		if (!userId) {
			reject('please provide user email')
		}

		Users.findById({ _id: userId }, (err, user) => {
			if (err) {
				reject('Could not find user with provided email')
			} else {
				resolve(user)
			}
		})
	})
}
