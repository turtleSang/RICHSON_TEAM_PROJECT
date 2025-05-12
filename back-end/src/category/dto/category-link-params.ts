import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class CategoryLinkParams {
    @IsString()
    @Length(1, 20, { message: 'Link includes 100 characters' })
    @Matches(/^[a-z-]+$/, { message: 'Link must be only lowercase text and -' })
    @IsNotEmpty({ message: "Link is not empty" })
    link: string;
}