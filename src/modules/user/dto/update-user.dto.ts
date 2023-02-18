import { IsEmail, IsString, Length, IsOptional, IsObject } from 'class-validator';

export default class UpdateUserDTO {
  @IsString({message: 'name is required'})
  @Length(1, 15, {message: 'Min length name is 1, max is 15'})
  public name?: string;

  @IsEmail({}, {message: 'email must be valid address'})
  public email?: string;

  @IsOptional()
  @IsString({message: 'avatarUrl must be string'})
  public avatarUrl?: string;

  @IsObject({message: 'typeUser must be'})
  public typeUser?: string;

  @IsString({message: 'password is required'})
  @Length(6, 12, {message: 'Min length for password is 6, max is 12'})
  public password?: string;
}
