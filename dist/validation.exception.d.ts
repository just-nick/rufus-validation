import { ValidationError } from "./validation-error";
export declare class ValidationException extends Error {
    errors: ValidationError[];
    constructor(errors: ValidationError[]);
}
