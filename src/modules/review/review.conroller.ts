import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import CreateReviewDto from './dto/create-review.dto.js';
import { StatusCodes } from 'http-status-codes';
import { ReviewServiceInterface } from './review-service.interface.js';
import HttpError from '../../common/errors/http-error.js';
import { fillDTO } from '../../utils/common.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
import ReviewResponse from './response/review.response.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-route.middleware.js';

@injectable()
export default class ReviewController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ReviewServiceInterface) private readonly reviewService: ReviewServiceInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.logger.info('Register routes for CommentController...');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateReviewDto),
        new PrivateRouteMiddleware(),
      ]});
  }

  public async create(
    req: Request<object, object, CreateReviewDto>,
    res: Response
  ): Promise<void> {

    const {body} = req;
    if (!await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }
    const comment = await this.reviewService.create({...body, userId: req.user.id});
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(ReviewResponse, comment));
  }
}
