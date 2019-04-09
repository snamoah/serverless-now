const identity = value => value

/**
 * @function handler
 *
 * @param { Function } options - action function (used for lambda-invoked events)
 * @param { Object } options - options for http-invoked revents
 * @param { Array<Object> } options.actions - actions to be run per http method
 * @param { Function } options.formatResponse - format response to the client
 * @param { Function } options.formatError - format error to the client
 * @returns { AsyncFunction }
 */
const createHandler = ({
  formatError = identity,
  formatResponse = identity,
  ...options
}) => async event => {
  try {
    const { httpMethod } = event.requestContext
    const action = options.action || options.actions[httpMethod]

    if (!action) {
      throw new Error('Method not found')
    }

    const response = await action(event)
    return formatResponse(response)
  } catch (error) {
    return formatError(error)
  }
}

module.exports = {
  createHandler
}
