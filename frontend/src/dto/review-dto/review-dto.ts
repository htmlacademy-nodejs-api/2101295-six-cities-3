import { User } from '../../types/types.js';

export default class ReviewDto {
  public id!: string;

  public text!: string;

  public rating!: number;

  public user!: User;

  public date!: string;
}
