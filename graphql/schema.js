const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

const { 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLInt, 
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const AuthorType = new GraphQLObjectType({
  name: 'author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    book: {
      type: new GraphQLList(BookType),
      resolve( parent, args ) {
        return Book.find({authorId: parent.id});
      }
    }
  })
});

const BookType = new GraphQLObjectType({
  name: 'book',
  fields: ()=> ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    pages: { type: GraphQLInt },
    author: {
      type: AuthorType,
      resolve( parent, args ){
        return Author.findById( parent.authorId );
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID }},
      resolve( parent, args ) {
        return Book.findById( args.id );
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return Book.find({});
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args){
        return Author.findById(args.id);
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return Author.find({});
      }
    }
  }
});

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
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save()
      }
    },
    removeAuthor: {
      type: AuthorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args){
        return Author.findByIdAndRemove(args.id);
      }
    },
    updateAuthor: {
      type: AuthorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args){
        return Author.updateOne(args.id);
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
        let book = new Book({
          name: args.name,
          pages: args.pages,
          authorId: args.authorId,
        });
        return book.save();
      }
    },
    removeBook: {
      type: BookType,
      resolve(parent, args){
        return Book.findByIdAndRemove(args.id);
      }
    }
  }
})
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})