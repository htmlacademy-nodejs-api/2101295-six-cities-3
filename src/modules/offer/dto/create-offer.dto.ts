import { City } from '../../../types/city.type';
import { IsString, IsArray, IsDateString, IsBoolean, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength, ArrayMinSize, ArrayMaxSize, IsObject } from 'class-validator';

export default class CreateOfferDTO {
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsDateString({}, {message: 'date must be valid ISO date'})
  public date!: Date;

  @IsObject({message: '$property should be a value from OfferCity'})
  public city!: City;

  @IsString({message: 'Thumbnail is required'})
  public previewImage!: string;

  @IsArray({message: 'Field pictures must be an array'})
  @ArrayMinSize(6, { message: 'Minimum must be 6 picture' })
  @ArrayMaxSize(6, { message: 'Maximum must be 6 picture' })
  public images!: string[];

  @IsBoolean({message: 'IsPremium must be an boolean'})
  public isPremium!: boolean;

  @IsBoolean({message: 'IsFavorites must be an boolean'})
  public isFavorite!: boolean;

  @Min(1, {message: 'Minimum rating is 1'})
  @Max(5, {message: 'Maximum rating is 5'})
  public rating!: number;

  @IsEnum({message: 'type must be only Apartment, House, Room or Hotel'})
  public type!: string;

  @IsInt({message: 'Rooms number must be an integer'})
  @Min(1, {message: 'Minimum rating is 1'})
  @Max(8, {message: 'Maximum price is 8'})
  public bedrooms!: number;

  @IsInt({message: 'Rooms number must be an integer'})
  @Min(1, {message: 'Minimum rating is 1'})
  @Max(10, {message: 'Maximum price is 10'})
  public maxAdults!: number;

  @IsInt({message: 'Price must be an integer'})
  @Min(100, {message: 'Minimum price is 100'})
  @Max(100000, {message: 'Maximum price is 100000'})
  public price!: number;

  @IsArray({message: 'Field сonveniences must be an array'})
  public conveniences!: string[];

  @IsMongoId({message: 'userId field must be valid an id'})
  public userId!: string;

  @IsObject({ message: 'Location must be specific format' })
  public location!: {
    latitude: number;
    longitude: number;
};
}
