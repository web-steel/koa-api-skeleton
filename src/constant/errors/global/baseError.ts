export class BaseError extends Error {
    statusCode: number;
    code: string;
    message: string;
}