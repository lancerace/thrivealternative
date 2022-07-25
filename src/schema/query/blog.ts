import { gql } from "apollo-server-express";
import { IBlog } from "../../interfaces/blog";

export const BlogDefs = gql`

    type BlogType {
        title: String!
        content: String
        author: Int!
    }
    
    type GetBlogType {
        blogs: [BlogType]
    }
`



export async function getBlogsResolver(_, args, { req }) {

    

    return [{
        title: "test title",
        content: " test content",
        author: 1
    }];
}