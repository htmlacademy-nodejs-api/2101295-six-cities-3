import { City } from '../../../../src/types/city.type';
import { Type } from '../../types/types';
import UserDto from '../user-dto/user-dto';

export default class OfferDto {
  public id!: string;

  public title!: string;

  public description!: string;

  public date!: Date;

  public city!: City;

  public previewImage!: string;

  public images!: string[];

  public isPremium!: boolean;

  public isFavorite!: boolean;

  public rating!: number;

  public type!: Type;

  public bedrooms!: number;

  public maxAdults!: number;

  public price!: number;

  public user!: UserDto;

  public conveniences!: string[];

  public countReviews!: number;

  public location!: {
    latitude: number;
    longitude: number;
  };
}
