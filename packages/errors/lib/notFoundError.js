const customError = require('./customError')

const notFoundError = message =>
  customError({
    name: 'NotFoundError',
    message: message || 'Not Found'
  })

module.exports = notFoundError
