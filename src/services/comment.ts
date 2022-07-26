import { DeleteResult, InsertResult, UpdateResult } from "typeorm";
import { DBErrorHandling, DataSource } from "../utils";
import { Blog, Comment } from '../entities';
import { BlogService } from "../services";
import { UserInputError } from "apollo-server-errors";

export async function addComment(fields: { blogId: number, comment: string }): Promise<Comment> {
    try {
        const blog: Blog = await BlogService.getBlog(fields.blogId);
        if (!blog)
            throw new UserInputError(`Blog Id ${fields.blogId} does not exist`);

        const result: InsertResult = await DataSource
            .createQueryBuilder()
            .insert()
            .into(Comment)
            .values({ ...fields })
            .execute();

        if (result.generatedMaps.length > 0)
            return result.generatedMaps[0] as Comment;
    } catch (err) {
        await DBErrorHandling(err.message);
    }
}

export async function getComment(fields: { commentId: number }): Promise<Comment> {

    var query = DataSource
        .getRepository(Comment)
        .createQueryBuilder('comment')
        .select(['comment.commentId AS "commentId"', 'comment.comment AS "comment"'])
        .where("comment.commentId = :commentId", { commentId: fields.commentId });

    return await query.getRawOne();
}

export async function updateComment(fields: { comment: string }, commentId: number): Promise<{success:boolean}> {

    const comment: Comment = await getComment({ commentId });
    if (!comment)
        throw new UserInputError(`comment Id ${commentId} does not exist`);

   const res : UpdateResult = await DataSource
        .createQueryBuilder()
        .update(Comment)
        .set({ ...fields })
        .where("commentId = :commentId", { commentId })
        .execute()

    return { success: (res.affected > 0) };
}



export async function deleteComment(commentId: number): Promise<{ success: boolean }> {


    const comment: Comment = await getComment({ commentId });
    console.log(comment);
    if (!comment)
        throw new UserInputError(`Comment Id ${commentId} does not exist`);

    const res: DeleteResult = await DataSource
        .createQueryBuilder()
        .softDelete()
        .from(Comment)
        .where("commentId = :commentId", { commentId })
        .execute();

    return { success: (res.affected > 0) }
}

export default { addComment, deleteComment, updateComment }