import { BlogMutationDefs, createBlogMutationResolver } from './blog';
import { createUserMutationResolver, UserMutationDefs, loginMutationResolver } from './user';
import { gql } from "apollo-server-express";

const APIRespondMutationDefs = gql`
    interface APIRespondMutationType {
        message: String
    }
`


export { APIRespondMutationDefs, BlogMutationDefs, createBlogMutationResolver, createUserMutationResolver, loginMutationResolver, UserMutationDefs }