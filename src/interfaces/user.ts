import { User } from "../entities";

export interface IAuthenticatedUser {
    user: any;
    message: string;
    success: boolean;
}
