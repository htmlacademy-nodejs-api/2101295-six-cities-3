import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import CreateOfferDto from './dto/create-offer.dto.js';
import * as core from 'express-serve-static-core';
//import { StatusCodes } from 'http-status-codes';
import { OfferServiceInterface } from './offer-service.interface.js';
import { fillDTO } from '../../utils/common.js';
import OffersResponse from './response/offer.response.js';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../common/errors/http-error.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
//import HttpError from '../../common/errors/http-error.js';

type ParamsGetOffer = {
  offerId: string;
}

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,

  ) {
    super(logger);
    this.logger.info('Register routes for OfferController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.show});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/', method: HttpMethod.Put, handler: this.update});
    this.addRoute({path: '/:offerId', method: HttpMethod.Delete, handler: this.delete});
  }


  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const offerResponse = fillDTO(OffersResponse, offers);
    this.send(res, StatusCodes.OK, offerResponse);
  }

  public async show(
    { params }: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }
    this.ok(res, fillDTO(OffersResponse, offer));
  }


  public async create(
    {body}: Request<Record<string, unknown>, CreateOfferDto>,
    res: Response,
  ): Promise<void> {

    const result = await this.offerService.create(body);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(OffersResponse, result)
    );
  }

  public async update(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, UpdateOfferDto>,
    res: Response): Promise<void> {

    const existOffer = await this.offerService.findById(body.id);
    if (!existOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id «${body.id}» doesn't exist.`,
        'OfferController'
      );
    }

    const result = await this.offerService.updateById(body.id, body);
    this.send(
      res,
      StatusCodes.OK,
      fillDTO(OffersResponse, result)
    );
  }

  public async delete(
    { params }: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    this.noContent(res, offer);
  }

}
