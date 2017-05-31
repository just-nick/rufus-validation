import { ValidationError } from "./validation-error";

export class ValidationException extends Error {
    constructor(public errors: ValidationError[]){
        super('Rufus encountered a validation issue');
        this.name = 'ValidationError';
    }
}