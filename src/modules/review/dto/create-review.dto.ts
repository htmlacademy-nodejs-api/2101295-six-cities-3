import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export default class CreateReviewDto {
  @IsString({message: 'text is required'})
  @Length(5, 1024, {message: 'Min length is 5, max is 1024'})
  public text!: string;

  @IsNumber()
  @Min(1, {message: 'Minimum rating is 1'})
  @Max(8, {message: 'Maximum rating is 5'})
  public rating!: number;

  public userId!: string;
}
