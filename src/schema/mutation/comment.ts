import { gql } from "apollo-server-express";
import { Comment } from "../../entities";
import { IAuthenticatedUser } from "../../interfaces";
import { CommentService } from "../../services";
import { AuthUtil } from "../../utils";

export const CommentMutationDefs = gql`
    
    type CommentMutationType implements APIResponseMutationType {
        message: String
    }
    
    type DeleteCommentMutationType implements APIResponseMutationType {
        message: String
    }

`
interface ICommentArgs {
    comment: string;
    blogId: number;
}


export async function addCommentMutationResolver(_, args: ICommentArgs, { req }) {
    const authResult: IAuthenticatedUser = await AuthUtil.authenticate(req.headers.authorization);

    const { comment, blogId } = args;

    const commentResult: Comment = await CommentService.addComment({ blogId, comment });

    return (!commentResult) ? { message: "Failed to create comment" } : { message: "comment created!" };
}


export async function deleteCommentMutationResolver(_, args: { commentId: number }, { req }) {
    const authResult: IAuthenticatedUser = await AuthUtil.authenticate(req.headers.authorization);

    const { commentId } = args;

    const res = await CommentService.deleteComment(commentId);
    return (res.success) ? { message: "deleted successfully" } : { message: "fail to delete comment" };

}

export async function updateCommentMutationResolver(_, args: { commentId: number, comment: string }, { req }) {
    const authResult: IAuthenticatedUser = await AuthUtil.authenticate(req.headers.authorization);

    const { commentId, comment } = args;

    const res = await CommentService.updateComment({ comment }, commentId);
    return (res.success) ? { message: "updated successfully" } : { message: "fail to update comment" };

}
