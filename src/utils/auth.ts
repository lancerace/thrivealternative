import { ForbiddenError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { IAuthenticatedUser } from '../interfaces/user';
import bcrypt from 'bcryptjs';
import { User } from '../entities';
import { UserService } from '../services';

async function hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}


async function issueAccessToken(username: string, password: string): Promise<{ accessToken: string }> {
    return jwt.sign({ username, password }, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '48h',
    });
}

async function authenticate(bearerToken: string): Promise<IAuthenticatedUser> {

    if (!bearerToken)
        throw new ForbiddenError("Unauthorized!");

    const token = bearerToken.split('Bearer ')[1];
    if (!token)
        throw new ForbiddenError('Invalid token!');

    const { username, password }: User = await jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ['HS256'],
    }, (err, decoded) => {
        if (err)
            throw new ForbiddenError('Invalid token!');
        return decoded;
    });

    const user: User = await UserService.getUser({ username, password });
    if (user)
        return { message: "success", user, success: true };
}


export default { issueAccessToken, authenticate, hashPassword }