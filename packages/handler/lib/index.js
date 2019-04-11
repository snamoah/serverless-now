const identity = value => value
const isFunction = value => typeof value === 'function'

const notFoundError = (message = 'Method not found') => {
  const error = new Error(message)
  error.name = 'NotFoundError'
  return error
}

/**
 * @function handler
 * @returns { AsyncFunction }
 */
const createHandler = (...args) => async event => {
  let action
  let actions
  let formatError
  let formatResponse
  let validateRequest

  if (args.length >= 4) {
    ;[validateRequest, actions, formatResponse, formatError] = args
  } else if (args.length === 3) {
    ;[actions, formatResponse, formatError] = args
  } else if (args.length === 2) {
    ;[actions, formatResponse] = args
  } else if (args.length === 1) {
    ;[actions] = args
  }

  formatError = formatError || identity
  formatResponse = formatResponse || identity
  validateRequest = validateRequest || identity
  action = isFunction(actions) && actions

  try {
    if (!actions) throw notFoundError()

    await validateRequest(event)
    const { httpMethod } = event.requestContext
    action = action || actions[httpMethod]

    if (!action) throw notFoundError()

    const response = await action(event)
    return formatResponse(response)
  } catch (error) {
    return formatError(error)
  }
}

module.exports = {
  createHandler
}
