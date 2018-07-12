const {GraphQLServer} = require('graphql-yoga');

const mongoose = require('mongoose');

const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
  .then(console.log('connected to db'))
  .catch((e) => `ERROR! --> ${e}`)

const Todo = mongoose.model('Todo', {
  text: String,
  complete: Boolean
})  

const resolvers = {
  Query: {
    hello: (_, {name}) => `Hello ${name || 'World'}`
  },
  Mutation: {
    createTodo: async (_, {text}) => {
      const todo = new Todo({
        text, complete: false
      })
      await todo.save()
      return todo
    }
  }
}

const server = new GraphQLServer({typeDefs: './typeDefs.graphql', resolvers});


server.start(() => console.log(`Server is running on http://localhost:4000`))