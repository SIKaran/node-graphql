const graphql = require('graphql');
const BookModel = require('../../models/book');
const {BookType} = require('../nodeTypes');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
} = graphql;

const BookQuery = () => ({
  book: {
    type: BookType,
    args: {id: {type: GraphQLID}},
    resolve(parent, args) {
      return BookModel.findById(args.id);
    }
  },
  books: {
    type: new GraphQLList(BookType),
    resolve(parent, args) {
      return BookModel.find({});
    }
  },
});

module.exports = BookQuery;