export enum UserType {
  Pro = 'pro',
  Regular = 'regular'
}

export type User = {
  email: string;
  name: string;
  avatarUrl: string;
  typeUser: UserType;
}
