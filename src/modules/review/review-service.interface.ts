import { DocumentType } from '@typegoose/typegoose/lib/types.js';

import { ReviewEntity } from './review.entity.js';
import CreateReviewDto from './dto/create-review.dto.js';

export interface ReviewServiceInterface {
  create(dto: CreateReviewDto): Promise<DocumentType<ReviewEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<ReviewEntity>[]>;
  deleteByOfferId(offerId: string): Promise<number | null>;
}
