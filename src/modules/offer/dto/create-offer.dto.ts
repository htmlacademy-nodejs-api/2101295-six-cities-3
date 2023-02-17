import { City } from '../../../types/city.type';

export default class CreateUserDTO {
  title!: string;
  description!: string;
  date!: Date;
  city!: City;
  previewImage!: string;
  images!: string[];
  isPremium!: boolean;
  isFavorite!: boolean;
  rating!: number;
  type!: string;
  bedrooms!: number;
  maxAdults!: number;
  price!: number;
  conveniences!: string[];
  userId!: string;
  countReviews!: number;
  location!: {
    latitude: number;
    longitude: number;
};
}
