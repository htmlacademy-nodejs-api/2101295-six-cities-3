import {inject, injectable} from 'inversify';
import CreateUserDTO from './dto/create-user.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {UserEntity} from './user.entity.js';
import {UserServiceInterface} from './user-service.interface.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {Component} from '../../types/component.types.js';
import UpdateUserDTO from './dto/update-user.dto.js';
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import LoginUserDto from './dto/login-user.dto.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { DEFAULT_AVATAR_FILE_NAME } from './user.constant.js';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.UserModel) private readonly userModel: ModelType<UserEntity>,
    @inject(Component.OfferModel) private readonly offerModel: ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity({...dto, avatarUrl: DEFAULT_AVATAR_FILE_NAME});
    user.setPassword(dto.password, salt);
    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async addFavorite(userId: string, offerId: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.userModel.findById(userId);
    const offersBefore = user?.favoritesOffers;
    const availabilityId = offersBefore?.find((el) => el === offerId);
    let offersAfter: string[] | undefined = [];

    if (availabilityId) {
      offersAfter = offersBefore?.filter((el) => el !== offerId);
    } else {offersAfter = offersBefore?.concat(offerId);}
    this.userModel
      .findByIdAndUpdate(userId, {'$set': {favoritesOffers: offersAfter}}, {new: true})
      .exec();

    return this.offerModel.findById(offerId);
  }

  public async findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async updateById(userId: string, dto: UpdateUserDTO): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, {new: true})
      .exec();
  }

  public async verifyUser(dto: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findByEmail(dto.email);

    if (! user) {
      return null;
    }

    if (user.verifyPassword(dto.password, salt)) {
      return user;
    }

    return null;
  }
}
