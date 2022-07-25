import { gql } from 'apollo-server-express';
import { merge } from 'lodash';
import { createBlogMutationResolver, BlogMutationDefs, createUserMutationResolver, loginMutationResolver, UserMutationDefs } from './mutation';
import { BlogDefs, getBlogsResolver } from './query';

const APIRespondMutationDefs = gql`
    interface APIResponseMutationType {
        message: String
    }
`

const Schema = gql`

    type Query {
        getBlogs: [BlogType]
    }

    type Mutation {
        register(firstName: String!, lastName: String!, username: String!, password: String!): UserMutationType
        createBlog(title: String!, content: String!): BlogMutationType
        login(username: String!, password: String!): LoginMutationType
    }

`;

const resolver = {
    Query: {
        getBlogs: getBlogsResolver
    },
    Mutation: {
        createBlog: createBlogMutationResolver,
        register: createUserMutationResolver,
        login: loginMutationResolver
    }

}

const typeDefs = [Schema, BlogMutationDefs, BlogDefs, APIRespondMutationDefs, UserMutationDefs];


const resolvers = merge(resolver);

export { typeDefs, resolvers };