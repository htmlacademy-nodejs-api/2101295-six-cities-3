import { City } from '../../../../src/types/city.type.js';

export default class UpdateOfferDto {

  public title?: string;

  public description?: string;

  public date?: Date;

  public city?: City;

  public previewImage?: string;

  public images?: string[];

  public isPremium?: boolean;

  public isFavorite?: boolean;

  public rating?: number;

  public type?: string;

  public bedrooms?: number;

  public maxAdults?: number;

  public price?: number;

  public conveniences?: string[];

  public userId?: string;

  public location?: {
    latitude: number;
    longitude: number;
};
}
