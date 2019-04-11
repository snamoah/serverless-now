const { expect } = require('chai')
const { formatErrorResponse } = require('../lib')

describe('FormatErrorResponse', () => {
  it('should return a function', () => {
    expect(formatErrorResponse()).to.be.a('function')
  })

  it('should return formatted error response with default statusCode', () => {
    const error = new Error('Message not sent')
    expect(formatErrorResponse({})(error)).to.eql({
      statusCode: 500,
      body: JSON.stringify({
        error: {
          name: 'ServerError',
          message: 'Message not sent'
        }
      })
    })
  })

  it('should return formatted error response with statusCode set from ERR_MAP', () => {
    const ERR_MAP = {
      ValidationError: 400
    }

    const error = {
      name: 'ValidationError',
      message: `'username' is required`
    }

    expect(formatErrorResponse(ERR_MAP)(error)).to.eql({
      statusCode: 400,
      body: JSON.stringify({
        error: {
          name: 'ValidationError',
          message: `'username' is required`
        }
      })
    })
  })
})
