const formatErrorResponse = (errorMap = {}) => error => {
  const statusCode = errorMap[error.name] || 500
  const name = errorMap[error.name] ? error.name : 'ServerError'

  return {
    statusCode,
    body: JSON.stringify({
      error: {
        name,
        message: error.message
      }
    })
  }
}

module.exports = formatErrorResponse
