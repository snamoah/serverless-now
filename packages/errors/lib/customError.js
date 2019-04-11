const customError = error => {
  const newError = new Error(error.message)
  newError.name = error.name
  newError.stack = error.stack
  return newError
}

module.exports = customError
