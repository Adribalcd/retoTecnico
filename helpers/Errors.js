exports.Mistake = class Mistake extends Error {
	/**
	 * Every error thorown as it is, is meant to reach the final user
	 * @param {String} message - Message to the client
	 */
	constructor(status, message) {
		super()
		this.name = 'mistake'
		this.status = status
		this.message = message
	}
}

exports.Forbidden = class Forbidden extends Error {
	/**
	 * Every error thorown as it is, is meant to reach the final user
	 * @param {String} message - Message to the client
	 */
	constructor(message) {
		super()
		this.name = 'forbidden'
		this.message = message
	}
}
