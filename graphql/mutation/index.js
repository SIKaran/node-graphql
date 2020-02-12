const graphql = require('graphql');
const BookModel = require('../../models/book');
const AuthorModel = require('../../models/author');
const { AuthorType, BookType } = require('../nodeTypes');

const { 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLInt,
  GraphQLNonNull,
} = graphql;

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args){
        let author = new AuthorModel({
          name: args.name,
          age: args.age,
        });
        return author.save()
      }
    },
    removeAuthor: {
      type: AuthorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args){
        return AuthorModel.findByIdAndRemove(args.id);
      }
    },
    updateAuthor: {
      type: AuthorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args){
        return AuthorModel.findOneAndUpdate({id: args.id}, { $set: { name: args.name, age: args.age } }).exec();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        pages: { type: new GraphQLNonNull(GraphQLInt) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args){
        let book = new BookModel({
          name: args.name,
          pages: args.pages,
          authorId: args.authorId,
        });
        return book.save();
      }
    },
    removeBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args){
        return BookModel.findByIdAndRemove(args.id);
      }
    },
    updateBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        pages: { type: GraphQLInt },
        authorId: { type: GraphQLString },
      },
      resolve(parent, args){
        return BookModel.findOneAndUpdate({id: args.id}, {$set: {name: args.name, pages: args.pages, authorId: args.authorId}}).exec();
      }
    },
  }
});

module.exports = { Mutation };