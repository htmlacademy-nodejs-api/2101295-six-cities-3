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
import { ConfigInterface } from '../../common/config/config.interface.js';

@injectable()
export default class ReviewController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ReviewServiceInterface) private readonly reviewService: ReviewServiceInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface

  ) {
    super(logger, configService);
    this.logger.info('Register routes for UserController…');

    this.logger.info('Register routes for CommentController...');
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateReviewDto),
        new PrivateRouteMiddleware(),
      ]});
  }

  public async create(
    req: Request,
    res: Response
  ): Promise<void> {

    const offer = await this.offerService.findById(req.params.offerId);
    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offer} not found.`,
        'CommentController'
      );
    }
    const comment = await this.reviewService.create({...req.body, userId: req.user.id, offerId: offer.id});
    await this.offerService.incCommentCount(offer.id);
    this.created(res, fillDTO(ReviewResponse, comment));
  }
}
