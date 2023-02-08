// Carlos Arellano - 101339585
require('dotenv').config()
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const employeeRouter = require('./routes/EmployeeRoutes.js');
const { typeDefs } = require('./typeDefs')
const { resolvers } = require('./resolvers')
const app = express()
module.exports = app

async function startServer() {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({ app })
    
    app.use("*",(req,res)=> res.status(404).send("Not found"))
    
    app.listen(8082, ()=>{ console.log('Server is running...')})
}

startServer()

app.use(express.json())

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

app.use('/api', employeeRouter)

