const graphql = require('graphql');
const ProductModel = require('../../models/product');
const {ProductType} = require('../nodeTypes');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
} = graphql;

const ProductQuery = () => ({
  product: {
    type: ProductType,
    args: {id: {type: GraphQLID}},
    resolve(parent, args) {
      return ProductModel.findById(args.id);
    }
  },
  products: {
    type: new GraphQLList(ProductType),
    resolve(parent, args) {
      return ProductModel.find({});
    }
  }
});

module.exports = ProductQuery;