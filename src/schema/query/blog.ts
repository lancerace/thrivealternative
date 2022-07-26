import { gql } from "apollo-server-express";
import { Blog } from "../../entities";
import { IAuthenticatedUser } from "../../interfaces";
import { IBlog } from "../../interfaces/blog";
import { BlogService } from "../../services";
import { AuthUtil } from "../../utils";

export const BlogDefs = gql`


    type CommentType {
        commentId: Int
        comment: String
        blogId: Int!
    }

    type BlogType {
        blogId: Int
        title: String
        content: String
        authorId: Int
        comments: [CommentType]
    }
`


export async function getBlogsResolver(_, args: { authorId: number }, { req }) {
    const authResult: IAuthenticatedUser = await AuthUtil.authenticate(req.headers.authorization);

    const blogs: Blog[] = await BlogService.getBlogs(authResult.user.userId)

    return blogs;
}