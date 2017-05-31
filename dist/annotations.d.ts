import { ValidationOptions } from "./validation-options";
import { CustomValidation } from "./custom-validation";
export declare function Validate(options?: ValidationOptions): (target: any, propertyKey: string) => void;
export declare function Required(required?: boolean): (target: any, propertyKey: string) => void;
export declare function CustomValidation(customValidator: CustomValidation): (target: any, propertyKey: string) => void;
