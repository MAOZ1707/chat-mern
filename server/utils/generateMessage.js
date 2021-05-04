const generateMessage = (text) => {
	return {
		text,
		time: new Date().getTime(),
	}
}

module.exports = {
	generateMessage,
}
