class dateError extends Error {
    constructor(message) {
      super(message)
      this.name = 'DATE_ERROR'
      this.message = message
    }
  }

class emailError extends Error {
    constructor(message) {
        super(message)
        this.name = "EMAIL_ERROR"
        this.message = message
    }
}

class deletionError extends Error {
  constructor(message) {
      super(message)
      this.name = "DELETION_ERROR"
      this.message = message
  }
}

module.exports = {
    dateError,
    emailError,
    deletionError
}