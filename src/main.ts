import 'reflect-metadata';
import {Container} from 'inversify';
import Application from './app/application.js';
import {Component} from './types/component.types.js';
import {applicationContainer} from './app/application.container.js';
import {userContainer} from './modules/user/user.container.js';
import {offerContainer} from './modules/offer/offer.container.js';
import {reviewContainer} from './modules/review/review.container.js';

const mainContainer = Container.merge(
  applicationContainer,
  userContainer,
  offerContainer,
  reviewContainer
);

async function bootstrap() {
  const application = mainContainer.get<Application>(Component.Application);
  await application.init();
}

bootstrap();
