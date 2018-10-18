# serverless-now

"Now.js"-like framework on top of serverless

## Background

So I've been playing around with the [serverless framework](https://serverless.com) https://github.com/serverless/serverless for about two weeks. The underlying concept is really cool. I don't really have a lot experience yet but my biggest takeaway so far is with creating functions; specifically the process between creating the endpoint entry in your `serverless.yml` file to when the function action is actually coded.

Example:

So let's say I am creating an todos api. I should be able to
  - create a new todo
  - view all todos
  - update a todo
  - delete a todo
  
I could use install a CRUD serverless service like [serverless-crud](https://github.com/fauna/serverless-crud) but then what if I wanted to add other domains, like user, etc...


Here's a detailed step of what I'll do, starting from scratch:

1. Install `serverless` => `npm install -g serverless`
2. Use an aws node js boilerplate (That's what I'm familier with :wink:) => `serverless create --template aws-nodejs --path hello-world`
3. Now, inside my services.yml, I'll change the function `hello` to:

```yaml
functions:
  todos:
    handler: handler.todos
    events:
      - http:
          method: get
          path: todos
      - http:
          method: get
          path: todos/{id}
      - http:
          method: post
          path: todos
      - http:
          method: put
          path: todos/{id}
      - http:
          method: delete
          path: todos/{id}
```
4. In my handler.js, I'll do something like this:

```javascript
const getTodo = require('./get')
const createTodo = require('./post')
const getTodos = require('./get-all')
const updateTodo = require('./update')
const removeTodo = require('./remove')

module.exports = (event, context) => {
  const behaviour = event.requestContext.httpMethod
  const noParams = isEmpty(event.pathParameters)
  
  switch (behaviour) {
    case: 'POST':
      return createTodo(event, context.done)
    case 'PUT':
      return updateTodo(event, context.done)
    case 'DELETE':
      return removeTodo(event, context.done)
    case 'GET':
       if (noParams) return getTodos(event, context.done)
       return getTodo(event, context.done)
  }
}
```

5. Now, here is where I actually do the coding I've been waiting all along to do. So I create the five files `get.js`, `post.js`, `get-all.js`, `remove.js`, and `update.js`.

```javascript
// get.js

module.exports = (event, cb) => {
  ...
  ...
}
```

```javascript
// post.js

module.exports = (event, cb) => {
  ...
  ...
}
```

```javascript
// update.js

module.exports = (event, cb) => {
  ...
  ...
}
```

```javascript
// remove.js

module.exports = (event, cb) => {
  ...
  ...
}
```

```javascript
// get-all.js

module.exports = (event, cb) => {
  ...
  ...
}
```

If there were other domains with crud features, I'd have to go through the same process.


## Concept

What if I could just structure my app in a way so that I just focus on the function actions themselves and not nessarily the handlers?

For instance, To create the same todo api I spoke about earlier, Steps 1 and 2 still apply:

2. I'll create a folder structure like this below:

```
- serverless.yml
- api
    - todos
        - get
        - put
        - post
        - patch
        - delete
```

3. Then start writing my code, Yay!

```javascript
// api/todos/get.js

module.exports = (event, cb) => {
  ...
  ...
}
```

```javascript
// api/todos/put.js

module.exports = (event, cb) => {
}
```

And I could even make use of es6's async/await instead of the ugly callbacks like so:

```javascript
// api/todos/get.js

module.exports = async event => {
  ...
  ...
}
```

4. Once I'm done with that, I can build to a native serverless app with this command:

```sh
$ serverless-now build
```
What this will do is: 
1. Create an function entry in your `serverless.yml` file for todos
2. Create http events for the various endpoints you defined based on the filenames it sees in the folder which corresponds to the http methods
3. Create the `handler.js` file to registering the actions for the http methods
4. Done! You can now deploy with `serverless-now deploy` (which is just an alias for `serverless deploy`)


## Thoughts?

I was just thinking about this today and I'll be working on it in the following weeks ahead. This is just an initial thought (very initial and I might be missing a lot of information regarding the implementation of serverless. I'm new to this remember?) But I hope, I get to understand serverless better after going through this project

You can create an issue with your thoughts/corrections/improvements, etc... they're all welcome :smile:
