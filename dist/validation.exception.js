"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationException extends Error {
    constructor(errors) {
        super('Rufus encountered a validation issue');
        this.errors = errors;
        this.name = 'ValidationError';
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=validation.exception.js.map