const { expect } = require('chai')
const { createHandler } = require('./index')

describe('Handler', () => {
  describe('createHandler()', () => {
    it('should be a function', () => {
      expect(createHandler).to.be.a('function')
    })

    it('should return a function', () => {
      expect(createHandler({})).to.be.a('function')
    })

    describe('Lambda-invoked event', () => {
      let event = {
        requestContext: {},
        body: JSON.stringify({ foo: 'bar' })
      }

      let action = event => ({ body: JSON.stringify(event) })

      it('should return stringified body', () => {
        return expect(createHandler({ action })(event)).to.eventually.eql({
          body: JSON.stringify(event)
        })
      })
    })

    describe('HTTP-invoked event', () => {
      const event = {
        requestContext: { httpMethod: 'GET' },
        body: JSON.stringify({ foo: 'bar' })
      }

      const actions = {
        GET: event => ({ body: JSON.stringify(event) })
      }

      it('should return stringified body', () => {
        return expect(createHandler({ actions })(event)).to.eventually.eql({
          body: JSON.stringify(event)
        })
      })
    })

    describe('Errors', () => {
      it('should return error if something fails', () => {
        return expect(createHandler({ actions: {} })({})).to.eventually.include(
          {
            message:
              "Cannot destructure property `httpMethod` of 'undefined' or 'null'."
          }
        )
      })
    })
  })
})
