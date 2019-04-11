const { expect } = require('chai')
const { notFoundError } = require('../lib')

describe('NotFoundError', () => {
  it('should return default error if no message is passed', () => {
    expect(notFoundError()).to.include({
      message: 'Not Found',
      name: 'NotFoundError'
    })
  })

  it('should return message passed', () => {
    const errorMessage = 'Method not found'
    expect(notFoundError(errorMessage)).to.include({
      message: errorMessage,
      name: 'NotFoundError'
    })
  })
})
