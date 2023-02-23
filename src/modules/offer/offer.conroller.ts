import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import CreateOfferDto from './dto/create-offer.dto.js';
import * as core from 'express-serve-static-core';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-object.middleware.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { fillDTO } from '../../utils/common.js';
import OffersResponse from './response/offer.response.js';
import { StatusCodes } from 'http-status-codes';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { ReviewServiceInterface } from '../review/review-service.interface.js';
import ReviewResponse from '../review/response/review.response.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import HttpError from '../../common/errors/http-error.js';

type ParamsGetOffer = {
  offerId: string;
}

type ParamsGetOfferByCity = {
  city: string;
}

enum ParamsValidate {
  Offer = 'offer',
  OfferId = 'OfferId'
}

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.ReviewServiceInterface) private readonly reviewService: ReviewServiceInterface
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/', method:
      HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(ParamsValidate.OfferId),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, ParamsValidate.Offer, ParamsValidate.OfferId),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware(ParamsValidate.OfferId),
        new DocumentExistsMiddleware(this.offerService, ParamsValidate.Offer, ParamsValidate.OfferId),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(ParamsValidate.OfferId),
        new DocumentExistsMiddleware(this.offerService, ParamsValidate.Offer, ParamsValidate.OfferId),
      ]
    });
    this.addRoute({
      path: '/:offerId/reviews',
      method: HttpMethod.Get,
      handler: this.getReviews,
      middlewares: [
        new ValidateObjectIdMiddleware(ParamsValidate.OfferId),
        new DocumentExistsMiddleware(this.offerService, ParamsValidate.Offer, ParamsValidate.OfferId),
      ]
    });
    this.addRoute({
      path: '/premium/:city',
      method: HttpMethod.Get,
      handler: this.getPremium
    });
  }


  public async index(
    req: Request,
    res: Response
  ): Promise<void> {
    const offers = await this.offerService.find();

    const {user} = req;
    if (!user) {
      offers.forEach((offer) => {
        offer.isFavorite = false;
      });
    }

    const offerResponse = fillDTO(OffersResponse, offers);
    this.send(res, StatusCodes.OK, offerResponse);
  }

  public async show(
    { params }: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OffersResponse, offer));
  }


  public async create(
    req: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response,
  ): Promise<void> {

    const {body, user} = req;
    const result = await this.offerService.create({...body, userId: user.id});
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(OffersResponse, result)
    );
  }

  public async update(
    req: Request,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.findById(req.params.offerId);
    if (updatedOffer?.userId?.toString() !== req.user.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'You cannot edit this offer!',
        'OfferController',
      );
    }

    const result = await this.offerService.updateById(req.params.offerId, req.body);
    this.ok(res, fillDTO(OffersResponse, result));
  }


  public async delete(
    req: Request,
    res: Response
  ): Promise<void> {
    const deletedOffer = await this.offerService.findById(req.params.offerId);
    if (deletedOffer?.userId?.toString() !== req.user.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'You cannot delete this offer!',
        'OfferController',
      );
    }
    const { offerId } = req.params;
    const offer = await this.offerService.deleteById(offerId);

    await this.reviewService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async getPremium(
    {params}: Request<core.ParamsDictionary | ParamsGetOfferByCity, object, object>,
    res: Response): Promise<void> {
    const premiumOffer = await this.offerService.findPremium();
    const result = premiumOffer.filter((offer) => offer.city.nameCity === params.city);
    this.ok(res, fillDTO(OffersResponse, result)
    );
  }

  public async getReviews(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer, object, object>,
    res: Response
  ): Promise<void> {
    const comments = await this.reviewService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(ReviewResponse, comments));
  }
}
