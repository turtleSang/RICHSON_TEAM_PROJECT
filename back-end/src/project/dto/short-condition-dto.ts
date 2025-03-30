import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsObject, ValidateNested } from "class-validator";

export enum ProjectShort {
    RATING = "project.rating",
    CREATEAT = "project.createAt",
    UPDATEAT = "project.updateAt"
}

export class ConditionProjectDto {
    @IsEnum(ProjectShort)
    type: ProjectShort;

    @IsBoolean()
    short: boolean
}

