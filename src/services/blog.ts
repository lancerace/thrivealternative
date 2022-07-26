import { UserInputError } from "apollo-server-express";
import { DeleteResult, InsertResult } from "typeorm";
import { ModuleResolutionKind } from "typescript";
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

        if (result.generatedMaps.length > 0)
            return result.generatedMaps[0] as Blog;
    } catch (err) {
        await DBErrorHandling(err.message);
    }
}

export async function getBlog(blogId: number) {
    try {
        var query = DataSource
            .getRepository(Blog)
            .createQueryBuilder('blog')
            .select(['blog.blogId AS "blogId"', 'blog.title AS "title"', 'blog.content AS "content"', 'blog.authorId AS "authorId"'])
            .where("blog.blogId = :blogId", { blogId });

        return await query.getRawOne();
    } catch (err) {
        await DBErrorHandling(err.message);
    }
}

export async function getBlogs(authorId: number): Promise<Blog[]> {
    try {
        var query = DataSource
            .getRepository(Blog)
            .createQueryBuilder('blog')
            .select(['blog.blogId', 'blog.title', 'blog.content', 'blog.authorId',
                'comments.commentId', 'comments.comment', 'comments.blogId'])
            .leftJoin("blog.comments", "comments")

        return await query.getMany();
    } catch (err) {
        await DBErrorHandling(err.message);
    }
}

export async function deleteBlog(blogId: number): Promise<{ success: boolean }> {


    const doesBlogExist: Blog = await getBlog(blogId);
    if (!doesBlogExist)
        throw new UserInputError(`Blog Id ${blogId} does not exist`);

    const blog = await DataSource.getRepository(Blog).findOne({
        relations: ['comments'],
        where: {
            blogId
        }
    });

    const result = await DataSource.getRepository(Blog).softRemove(blog);
    if (result)
        return { success: true };
    else
        return { success: false }
}

export default { createBlog, getBlog, getBlogs, deleteBlog }