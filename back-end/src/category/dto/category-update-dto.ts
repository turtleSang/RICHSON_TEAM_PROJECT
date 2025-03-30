import { IsNotEmpty, IsOptional, IsString, Length, Matches, MaxLength } from "class-validator";

export class CategoryUpdateDto {

    @IsString()
    @Length(1, 100, { message: "Name includes 100 characters" })
    @Matches(/^[A-Za-z\s]+$/, { message: "Only text and space" })
    @IsOptional()
    name: string;

    @IsString()
    @Length(1, 20, { message: 'Link includes 100 characters' })
    @Matches(/^[a-z-]+$/, { message: 'Link must be only lowercase text and -' })
    @IsOptional()
    link: string;

    @IsString()
    @MaxLength(200, { message: 'Description includes 200 characters' })
    @IsOptional()
    description: string
} 