import { City } from './city.type';
import { User } from './user.type';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  conveniences: string[];
  user: User;
  countReviews: number;
  location: {
    latitude: number;
    longitude: number;
  };


};
