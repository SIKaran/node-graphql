const graphql = require('graphql');
const AuthorModel = require('../../models/author');
const {AuthorType} = require('../nodeTypes');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
} = graphql;

const AuthorQuery = () => ({
  author: {
    type: AuthorType,
    args: {id: {type: GraphQLID}},
    resolve(parent, args) {
      return AuthorModel.findById(args.id);
    }
  },
  authors: {
    type: new GraphQLList(AuthorType),
    resolve(parent, args) {
      return AuthorModel.find({});
    }
  }
});

module.exports = AuthorQuery;