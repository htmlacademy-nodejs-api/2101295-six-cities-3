import { Container } from 'inversify';
import { Component } from '../../types/component.types.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import OfferService from './offer.service.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { types } from '@typegoose/typegoose';
import { ControllerInterface } from '../../common/controller/controller.interface.js';
import OfferController from './offer.conroller.js';

const offerContainer = new Container();

offerContainer.bind<OfferServiceInterface>(Component.OfferServiceInterface).to(OfferService);
offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
offerContainer.bind<ControllerInterface>(Component.OfferController).to(OfferController);

export {offerContainer};
