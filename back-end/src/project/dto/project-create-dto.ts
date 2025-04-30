import { IsArray, IsNotEmpty, IsNumber, IsString, Length, Matches, MaxLength } from "class-validator";


export class ProjectCreateDto {
    @IsString()
    @Length(1, 100, { message: "Name includes 100 characters" })
    @Matches(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẶẮẴẰẶẲẶắẵằẳặềếễểệồốỗổộờớỡởợừứữửựýỳỷỹỵ0-9\s]+$/, { message: "Only text and space" })
    @IsNotEmpty({ message: "name is not empty" })
    name: string;

    @IsString()
    @MaxLength(200, { message: 'Description includes 200 characters' })
    @IsNotEmpty({ message: "Description is not empty" })
    description: string;

    @IsArray()
    @IsNumber({}, { each: true })
    categoryIdList: number[]
}