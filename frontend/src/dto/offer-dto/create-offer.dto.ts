import { City } from '../../../../src/types/city.type';

export default class CreateOfferDto {

  public title!: string;

  public description!: string;

  public date!: string;

  public city!: City;

  public previewImage!: string;

  public images!: string[];

  public isPremium!: boolean;

  public type!: string;

  public bedrooms!: number;

  public maxAdults!: number;

  public price!: number;

  public conveniences!: string[];

  public location!: {
    latitude: number;
    longitude: number;
};
}
