import { User } from './user.type';

export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
}
