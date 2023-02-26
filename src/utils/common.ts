import * as jose from 'jose';
import {plainToInstance, ClassConstructor} from 'class-transformer';
import {ValidationError} from 'class-validator';
import crypto from 'crypto';
import { Offer } from '../types/offer.type.js';
import {ValidationErrorField} from '../types/validation-error-field.type';
import {ServiceError} from '../types/service-error.enum.js';
import {UnknownObject} from '../types/unknown-object.type.js';
import {DEFAULT_STATIC_IMAGES} from '../app/application.const.js';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    title,
    description,
    date,
    latitudeCity,
    longitudeCity,
    nameCity,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    conveniences,
    email,
    name,
    avatarUrl,
    typeUser,
    countReviews,
    latitude,
    longitude
  ] = tokens;
  return {
    title,
    description,
    date: new Date(date),
    city: {latitudeCity: Number.parseFloat(latitudeCity), longitudeCity: Number.parseFloat(longitudeCity), nameCity},
    previewImage,
    images: images.split(';').map((img) => (img)),
    isPremium: JSON.parse(isPremium) as boolean,
    isFavorite: JSON.parse(isFavorite) as boolean,
    rating: Number.parseFloat(rating),
    type,
    bedrooms: Number.parseFloat(bedrooms),
    maxAdults: Number.parseFloat(maxAdults),
    price: Number.parseFloat(price),
    conveniences: conveniences.split(';').map((el) => (el)),
    user: {email, name, avatarUrl, typeUser},
    countReviews: Number.parseFloat(countReviews),
    location: {latitude: Number.parseFloat(latitude), longitude: Number.parseFloat(longitude)},
  } as Offer;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) => ({
  errorType: serviceError,
  message,
  details: [...details]
});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algoritm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

export const transformErrors = (errors: ValidationError[]): ValidationErrorField[] =>
  errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));

export const getFullServerPath = (host: string, port: number) => `http://${host}:${port}`;

const isObject = (value: unknown) => typeof value === 'object' && value !== null;

export const transformProperty = (
  property: string,
  someObject: UnknownObject,
  transformFn: (object: UnknownObject) => void
) => {
  Object.keys(someObject)
    .forEach((key) => {
      if (key === property) {
        transformFn(someObject);
      } else if (isObject(someObject[key])) {
        transformProperty(property, someObject[key] as UnknownObject, transformFn);
      }
    });
};

export const transformObject = (properties: string[], staticPath: string, uploadPath: string, data:UnknownObject) => {
  properties
    .forEach((property) => transformProperty(property, data, (target: UnknownObject) => {
      const rootPath = DEFAULT_STATIC_IMAGES.includes(target[property] as string) ? staticPath : uploadPath;
      target[property] = `${rootPath}/${target[property]}`;
    }));
};

