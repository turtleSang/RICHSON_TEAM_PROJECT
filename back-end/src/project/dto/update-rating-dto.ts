import { IsNumber, Max, Min } from "class-validator";

export class UpdateRatingDto {

    @IsNumber()
    id: number;

    @IsNumber()
    @Max(9.99)
    @Min(0.01)
    rating: number
}