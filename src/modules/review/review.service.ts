import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { ReviewServiceInterface } from './review-service.interface.js';
import { Component } from '../../types/component.types.js';
import { ReviewEntity } from './review.entity.js';
import CreateCommentDto from './dto/create-review.dto.js';

@injectable()
export default class CommentService implements ReviewServiceInterface {
  constructor(
    @inject(Component.ReviewModel) private readonly rewiewModel: types.ModelType<ReviewEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<ReviewEntity>> {
    const comment = await this.rewiewModel.create(dto);
    return comment.populate('userId');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<ReviewEntity>[]> {
    return this.rewiewModel
      .find({offerId})
      .populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.rewiewModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }
}
