import { InsertResult } from "typeorm";
import { Blog, Comment } from "../entities";
import DataSource from '../utils/datasource';
import { DBErrorHandling } from "../utils/error";

export async function createBlog(fields: { title: string, content: string, authorId: number }) {
    try {
        const result: InsertResult = await DataSource
            .createQueryBuilder()
            .insert()
            .into(Blog)
            .values({ ...fields })
            .execute();
        console.log(result);


        if (result.generatedMaps.length > 0)
            return result.generatedMaps[0] as Blog;
    } catch (err) {
        await DBErrorHandling(err.message);
    }
}

export async function addComment(fields: { blogId: number, comment: string }): Promise<Comment> {
    try {
        const result: InsertResult = await DataSource
            .createQueryBuilder()
            .insert()
            .into(Comment)
            .values({ ...fields })
            .execute();
        console.log(result);


        if (result.generatedMaps.length > 0)
            return result.generatedMaps[0] as Comment;
    } catch (err) {
        await DBErrorHandling(err.message);
    }
}

export default { createBlog, addComment }