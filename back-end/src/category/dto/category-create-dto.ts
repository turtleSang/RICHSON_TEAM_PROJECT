import { IsOptional, IsString, Length, Matches, MaxLength } from "class-validator";

export class CategoryCreateDto {
    @IsString()
    @Length(1, 100, { message: "Name includes 100 characters" })
    @Matches(/^[A-Za-z\s]+$/, { message: "Only text and space" })
    name: string;

    @IsString()
    @Length(1, 20, { message: 'Link includes 100 characters' })
    @Matches(/^[a-z-]+$/, { message: 'Link must be only lowercase text and -' })
    link: string;

    @IsString()
    @MaxLength(200, { message: 'Description includes 200 characters' })
    description: string;

    @IsString()
    @IsOptional()
    thumb: string;

}