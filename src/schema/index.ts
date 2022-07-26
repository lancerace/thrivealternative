import { gql } from 'apollo-server-express';
import { merge } from 'lodash';
import { createBlogMutationResolver, BlogMutationDefs, createUserMutationResolver, loginMutationResolver, UserMutationDefs,
    addCommentMutationResolver, deleteCommentMutationResolver, CommentMutationDefs, deleteBlogMutationResolver, updateCommentMutationResolver} from './mutation';
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
        deleteBlog(blogId: Int!): DeleteBlogMutationType
        login(username: String!, password: String!): LoginMutationType
        addComment(comment: String!, blogId: Int!): CommentMutationType
        updateComment(commentId: Int!, comment: String!): CommentMutationType
        deleteComment(commentId: Int!): DeleteCommentMutationType
    }

`;

const resolver = {
    Query: {
        getBlogs: getBlogsResolver
    },
    Mutation: {
        createBlog: createBlogMutationResolver,
        deleteBlog: deleteBlogMutationResolver,
        register: createUserMutationResolver,
        login: loginMutationResolver,
        addComment: addCommentMutationResolver,
        deleteComment: deleteCommentMutationResolver,
        updateComment: updateCommentMutationResolver
    }

}

const typeDefs = [Schema, BlogMutationDefs, BlogDefs, APIRespondMutationDefs, UserMutationDefs, CommentMutationDefs];


const resolvers = merge(resolver);

export { typeDefs, resolvers };