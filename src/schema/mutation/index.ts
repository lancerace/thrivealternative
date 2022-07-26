import { BlogMutationDefs, createBlogMutationResolver, deleteBlogMutationResolver } from './blog';
import { createUserMutationResolver, UserMutationDefs, loginMutationResolver } from './user';
import { addCommentMutationResolver, CommentMutationDefs, deleteCommentMutationResolver, updateCommentMutationResolver } from './comment';
import { gql } from "apollo-server-express";

const APIRespondMutationDefs = gql`
    interface APIRespondMutationType {
        message: String
    }
`


export { APIRespondMutationDefs, deleteCommentMutationResolver, addCommentMutationResolver, updateCommentMutationResolver, deleteBlogMutationResolver, CommentMutationDefs, BlogMutationDefs, createBlogMutationResolver, createUserMutationResolver, loginMutationResolver, UserMutationDefs }