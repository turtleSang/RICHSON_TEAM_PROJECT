import { IsEmpty, IsNotEmpty, IsOptional, IsString, Length, Matches, MaxLength } from "class-validator";

export class CategoryCreateDto {
    @IsString()
    @Length(1, 100, { message: "Name includes 100 characters" })
    @Matches(/^[A-Za-z\s]+$/, { message: "Only text and space" })
    @IsNotEmpty({ message: "name is not empty" })
    name: string;

    @IsString()
    @Length(1, 20, { message: 'Link includes 100 characters' })
    @Matches(/^[a-z-]+$/, { message: 'Link must be only lowercase text and -' })
    @IsNotEmpty({ message: "Link is not empty" })
    link: string;

    @IsString()
    @MaxLength(200, { message: 'Description includes 200 characters' })
    @IsNotEmpty({ message: "Description is not empty" })
    description: string;

}