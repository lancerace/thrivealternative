import { gql } from "apollo-server-express";
import { Comment } from "../../entities";
import { IAuthenticatedUser } from "../../interfaces";
import { BlogService } from "../../services";
import { AuthUtil } from "../../utils";

export const CommentMutationDefs = gql`
    
    type CommentMutationType implements APIResponseMutationType {
        message: String
    }

`
interface ICommentArgs {
comment:string;
blogId: number;
}


export async function createCommentMutationResolver(_, args: ICommentArgs, { req }) {
    const authResult: IAuthenticatedUser = await AuthUtil.authenticate(req.headers.authorization);

    const { comment, blogId } = args;

    const commentResult: Comment = await BlogService.addComment({ blogId, comment});

    return (!commentResult) ? { message: "Failed to create comment" }: { message: "comment created!" } ;
}