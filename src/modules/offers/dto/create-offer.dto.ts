import { City } from '../../../types/city.type';
import { User } from '../../../types/user.type';

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
  user!: User;
  countReviews!: number;
  location!: [number, number];
}
