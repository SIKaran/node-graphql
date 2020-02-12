const express = require('express');
const graphqlHTTP = require('express-graphql');
const path = require('path');

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
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.use(express.static('public'))

app.listen(PORT, ()=>{
  console.log('Server is running on port '+PORT);
});