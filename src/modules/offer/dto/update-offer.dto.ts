import { City } from '../../../types/city.type.js';
import { User } from '../../../types/user.type.js';

export default class UpdateOfferDto {
  public id!: string;
  public title?: string;
  public description?: string;
  public date?: Date;
  public city?: City;
  public previewImage?: string;
  public images?: string[];
  isPremium?: boolean;
  isFavorite?: boolean;
  rating?: number;
  type?: string;
  bedrooms?: number;
  maxAdults?: number;
  price?: number;
  conveniences?: string[];
  user?: User;
  countReviews?: number;
  location?: {
    latitude: number;
    longitude: number;
  };
}
