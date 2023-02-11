import { City } from '../../types/city.type.js';
//import {MIN_PRICE, MAX_PRICE, MIN_RATING, MAX_RATING, MIN_ROOMS, MAX_ROMMS, MAX_GUESTS, MIN_GUESTS} from '../../common/offer-generator/offer-generator.const.js';
import typegoose, {
  defaultClasses,
  getModelForClass,
  Ref
} from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface RentOfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true
  })
  public title!: string;

  @prop({
    trim: true,
    required: true
  })
  public description!: string;

  @prop({required: true})
  public date!: Date;

  @prop({required: true})
  public city!: City;

  @prop({required: true})
  public previewImage!: string;

  @prop({required: true})
  public images!: string[];

  @prop({required: true})
  public isPremium!: boolean;

  @prop({required: true})
  public isFavorite!: boolean;

  @prop({required: true})
  public rating!: number;

  @prop({
    required: true,
  })
  public type!: string;

  @prop({
    required: true,
  })
  public bedrooms!: number;

  @prop({
    required: true,
  })
  public maxAdults!: number;

  @prop({
    required: true,
  })
  public price!: number;

  @prop({required: true})
  public conveniences!: string[];

  @prop({
    required: true,
    ref: UserEntity
  })
  public user!: Ref<UserEntity>;

  @prop({default: 0})
  public countReviews!: number;

  @prop({required: true})
  public location!: {
    latitude: number;
    longitude: number;
  };
}

export const OfferModel = getModelForClass(OfferEntity);
