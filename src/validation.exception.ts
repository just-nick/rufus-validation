import { ValidationError } from "./validation-error";

export class ValidationException extends Error {
    constructor(public errors: ValidationError[]){
        super('Rufus encountered a validation issue: ' + errors.map(e => e.field + ' - ' + e.message + ' - ' + e.value).join(' : '));
        this.name = 'ValidationException';
    }
}