import { InsertResult } from "typeorm";
import User from "../entities/user";
import DataSource from '../utils/datasource';
import { DBErrorHandling } from "../utils/error";

export async function createUser(fields: { firstName: string, lastName: string, username: string, password: string }): Promise<User> {
    try {
        const result: InsertResult = await DataSource
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({ ...fields })
            .execute();

        if (result.generatedMaps.length > 0)
            return result.generatedMaps[0] as User;
    } catch (err) {
        await DBErrorHandling(err.message);
    }
}

export async function getUser(fields: { username: string, password?: string }): Promise<User> {

    var query = DataSource
        .getRepository(User)
        .createQueryBuilder('user')
        .select(['user.userId AS "userId"', 'user.username AS "username"', 'user.password AS "password"', 'user.firstName AS "firstName"', 'user.lastName AS "lastName"',])
        .where("user.username = :username", { username: fields.username });

    if (fields.password)
        query = await query.andWhere("user.password = :password", { password: fields.password });

    return await query.getRawOne();
}

export default { createUser, getUser }