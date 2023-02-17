import { Expose } from 'class-transformer';
import { City } from '../../../types/city.type.js';
//import UserResponse from '../../user/response/user.response.js';
//import { User } from '../../../types/user.type.js';


export default class OffersResponse {
  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public date!: Date;

  @Expose()
  public city!: City;

  @Expose()
  public previewImage!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: string;

  @Expose()
  public bedrooms!: number;

  @Expose()
  public maxAdults!: number;

  @Expose()
  public price!: number;

  @Expose()
  public conveniences!: string[];

  @Expose()
  public userId!: string;

  @Expose()
  public countReviews!: number;

  @Expose()
  public location!: {
    latitude: number;
    longitude: number;
  };
}
