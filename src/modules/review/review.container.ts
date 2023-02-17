import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { ReviewEntity, ReviewModel } from './review.entity.js';
import { ReviewServiceInterface } from './review-service.interface.js';
import ReviewService from './review.service.js';
import { Component } from '../../types/component.types.js';
import ReviewController from './review.conroller.js';
import { ControllerInterface } from '../../common/controller/controller.interface.js';

const reviewContainer = new Container();

reviewContainer.bind<ReviewServiceInterface>(Component.ReviewServiceInterface).to(ReviewService).inSingletonScope();
reviewContainer.bind<types.ModelType<ReviewEntity>>(Component.ReviewModel).toConstantValue(ReviewModel);
reviewContainer.bind<ControllerInterface>(Component.ReviewController).to(ReviewController).inSingletonScope();

export { reviewContainer };
