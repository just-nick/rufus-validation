import { ValidationOptions } from "./validation-options";
export declare function Validate(options?: ValidationOptions): (target: any, propertyKey: string) => void;
export declare function Required(required?: boolean): (target: any, propertyKey: string) => void;
