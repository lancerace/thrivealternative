import { gql } from "apollo-server-express";
import User from "../../entities/user";
import { UserService } from "../../services";
import { AuthUtil } from "../../utils";
import bcrypt from 'bcryptjs';
export const UserMutationDefs = gql`
    
    type UserMutationType implements APIResponseMutationType {
        message: String
    }

    type LoginMutationType implements APIResponseMutationType {
        message: String
        userId: Int
        accessToken: String
    }

`


interface ICreateUserArgs {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}


export async function createUserMutationResolver(_, args: ICreateUserArgs, { req }) {


    const { firstName, lastName, username, password } = args;

    const isUserExist: User = await UserService.getUser({ username });
    if (isUserExist)
        return { message: "User Already Exist" };

    const hashedPassword = await AuthUtil.hashPassword(password);
    const result: User = await UserService.createUser({ firstName, lastName, username, password: hashedPassword });

    return (result !== null) ? { message: "User created!" } : { message: "Fail to create user" };
}

export async function loginMutationResolver(_, args, { req }) {

    const { username, password } = args;
    const user: User = await UserService.getUser({ username });

    //ambiguous message for security purposes
    if (!user)
        return { message: "Wrong username or password" };

    const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect)
        return { message: "Wrong username or password" };

    return { userId: user.userId, accessToken: await AuthUtil.issueAccessToken(user.username, user.password) };
}
