import { UserInputError } from "apollo-server-express";
import { DB_UNIQUE_CONSTRAINT_ERR } from "../constants/error";
import logger from "./logger";

export async function DBErrorHandling(errorMessage: string) {
    logger.error(errorMessage);
    if (errorMessage.includes(DB_UNIQUE_CONSTRAINT_ERR))
        throw new UserInputError("No duplicate allowed. Record already exist.");
    else
        throw new UserInputError(errorMessage);
}
