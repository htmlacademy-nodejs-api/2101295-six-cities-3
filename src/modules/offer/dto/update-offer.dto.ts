import { City } from '../../../types/city.type.js';
import { User } from '../../../types/user.type.js';

export default class UpdateOfferDto {
  title?: string;
  description?: string;
  date?: Date;
  city?: City;
  previewImage?: string;
  images?: string[];
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
