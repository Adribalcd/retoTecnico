exports.Mistake = class Mistake extends Error {
	/**
	 * @param {String} message
	 */
	constructor(status, message) {
		super()
		this.name = 'mistake'
		this.status = status
		this.message = message
	}
}
