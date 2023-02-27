import { UserType } from '../../const';


export default class UserDto {
  public id!: string;

  public name!: string ;

  public email!: string;

  public typeUser!: UserType;

  public avatarUrl!: string;

  public token!: string;
}
