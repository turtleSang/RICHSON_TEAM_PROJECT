import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export class ValidatorPipe implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        if (!value) {
            throw new BadRequestException('value is not null');
        }

        const obj = plainToInstance(metatype, value);
        const err: ValidationError[] = await validate(obj);
        if (err.length > 0) {
            throw new BadRequestException(err);
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
} 