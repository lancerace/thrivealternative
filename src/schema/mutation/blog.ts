import { gql } from "apollo-server-express";
import { Blog } from "../../entities";
import { IAuthenticatedUser } from "../../interfaces";
import { BlogService } from "../../services";
import { AuthUtil } from "../../utils";

export const BlogMutationDefs = gql`
    
    type BlogMutationType implements APIResponseMutationType {
        message: String
    }

`
interface ICreateBlogArgs {
    title: string;
    content: string;
}


export async function createBlogMutationResolver(_, args: ICreateBlogArgs, { req }) {
    const authResult: IAuthenticatedUser = await AuthUtil.authenticate(req.headers.authorization);

    const { title, content } = args;

    const blog: Blog = await BlogService.createBlog({ title, content, authorId: authResult.user.userId })

    return (!blog) ? { message: "Failed to create blog" }: { message: "Blog created!" } ;
}