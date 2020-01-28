const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./graphql/schema');

const { setupDB } = require('./config/database');
setupDB((res)=>console.log(res));

const PORT = process.env.PORT || 4000;
const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  pretty: true,
}));

app.listen(PORT, ()=>{
  console.log('Server is running on port '+PORT);
});