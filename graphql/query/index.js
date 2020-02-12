const graphql = require('graphql');
const AuthorQuery = require('./author');
const BookQuery = require('./book');
const ProductQuery = require('./product');

const { 
  GraphQLObjectType,
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    ...AuthorQuery,
    ...BookQuery,
    ...ProductQuery,
  })
});

module.exports = { RootQuery };