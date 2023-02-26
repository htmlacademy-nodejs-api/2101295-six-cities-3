import { Expose } from 'class-transformer';

export default class UserResponseFavorites {
  @Expose()
  public name!: string ;

  @Expose()
  public email!: string;

  @Expose()
  public favoritesOffers!: string[];
}
