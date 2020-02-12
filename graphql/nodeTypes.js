const graphql = require('graphql');
const BookModel = require('../models/book');
const AuthorModel = require('../models/author');
const { 
  GraphQLObjectType, 
  GraphQLID, 
  GraphQLString, 
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  getIntrospectionQuery
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
        return BookModel.find({authorId: parent.id});
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
    authorId: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve( parent, args ){
        return AuthorModel.findById( parent.authorId );
      }
    }
  })
});

const ProductType = new GraphQLObjectType({
  name: 'product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    imgPath: { type: GraphQLString },
  })
});

module.exports = { BookType, AuthorType, ProductType };