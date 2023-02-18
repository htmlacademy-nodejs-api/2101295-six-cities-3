import { Expose, Type } from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';

export default class ReviewResponse {
  @Expose()
  public id!: string;

  @Expose()
  public comment!: string;

  @Expose({ name: 'createdAt'})
  public date!: string;

  @Expose({ name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public rating!: number;
}
