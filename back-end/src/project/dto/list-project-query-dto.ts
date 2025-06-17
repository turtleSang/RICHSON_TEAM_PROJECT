import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";
import { ProjectShort } from "./short-condition-dto";

export class ListProjectQueryDto {
    @Type(() => Number)
    @IsNumber()
    @IsInt()
    @IsPositive()
    page: number;

    @Type(() => Number)
    @IsNumber()
    @IsInt()
    @IsPositive()
    size: number = 4;

    @IsEnum(ProjectShort)
    type: ProjectShort;


    @Type(() => Boolean)
    @IsBoolean()
    short: boolean;
}