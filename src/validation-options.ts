import { CustomValidation } from "./custom-validation";

export interface ValidationOptions {
    required?: boolean;
    customValidator?: CustomValidation;
}