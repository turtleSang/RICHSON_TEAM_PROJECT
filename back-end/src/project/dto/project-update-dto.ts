import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, MaxLength } from "class-validator";

export class ProjectUpdateDto {
    @IsString()
    @Length(1, 100, { message: "Name includes 100 characters" })
    @Matches(/^[A-Za-z0-9 ]+$/, { message: "Only text and space" })
    @IsOptional({ message: "name is not empty" })
    name: string;

    @IsString()
    @MaxLength(200, { message: 'Description includes 200 characters' })
    @IsOptional({ message: "Description is not empty" })
    description: string;

    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    categoryIdList: number[]
}