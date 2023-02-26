import { Expose, Transform, Type } from 'class-transformer';
import { City } from '../../../types/city.type.js';
import { HomeType } from '../../../types/home-type.enum.js';
import UserResponse from '../../user/response/user.response.js';

export default class OffersResponse {
  @Expose({ name: '_id'})
  @Transform((value) => value.obj._id.toString())
  public id!: string;

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
  public type!: HomeType;

  @Expose()
  public bedrooms!: number;

  @Expose()
  public maxAdults!: number;

  @Expose()
  public price!: number;

  @Expose()
  public conveniences!: string[];

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public countReviews!: number;

  @Expose()
  public location!: {
    latitude: number;
    longitude: number;
  };
}
