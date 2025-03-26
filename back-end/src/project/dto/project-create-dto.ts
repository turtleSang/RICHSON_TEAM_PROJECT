import { IsArray, IsString, Matches, MaxLength } from "class-validator";


export class ProjectCreateDto {
    @IsString()
    @MaxLength(255)
    name: string;

    @IsString()
    description: string;

    @IsArray()
    categoryId: number[]
}