import { Container } from 'inversify';
import { Component } from '../../types/component.types.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import OfferService from './offer.service.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { types } from '@typegoose/typegoose';

const offerContainer = new Container();

offerContainer.bind<OfferServiceInterface>(Component.OfferServiceInterface).to(OfferService);
offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

export {offerContainer};
