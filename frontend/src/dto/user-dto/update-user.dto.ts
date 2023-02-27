import { UserType } from '../../const.js';

export default class UpdateUserDTO {
  public name?: string;

  public email?: string;

  public avatarUrl?: string;

  public typeUser?: UserType;

  public password?: string;

}
