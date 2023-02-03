import dayjs from 'dayjs';
import { MockData } from '../../types/mock-data.type.js';
import {MIN_PRICE, MAX_PRICE, MIN_RATING, MAX_RATING, MIN_ROOMS, MAX_ROMMS, MAX_GUESTS, MIN_GUESTS, CityLocation, FIRST_WEEK_DAY, LAST_WEEK_DAY, conveniences, MIN_REVIEWS, MAX_REVIEWS} from './offer-generator.const.js';
//import { HomeType } from '../../types/home-type.enum.js';
//import { GoodType } from '../../types/good-type.enum.js';
//import { UserType } from '../../types/user-type.enum.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const prevImg = getRandomItem<string>(this.mockData.prevImages);
    const image = getRandomItems<string>(this.mockData.images, 6).join(';');
    const isPremium = getRandomItem<string>(['true','false']);
    const isFavorite = getRandomItem<string>(['true','false']);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1).toString();
    const type = getRandomItem(['apartment', 'house', 'room', 'hotel']);
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROMMS).toString();
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const goods = getRandomItems<string>(conveniences).join(';');
    const name = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarUrl = getRandomItem<string>(this.mockData.avatars);
    const userType = getRandomItem(['standart', 'pro']);
    const countReviews = generateRandomValue(MIN_REVIEWS, MAX_REVIEWS);
    const location = getRandomItem<string>(this.mockData.locations);
    const [city, latitude, longitude] = location.split(' ');
    const selectedCity = CityLocation[city as keyof typeof CityLocation].toString();
    const [latitudeCity, longitudeCity] = selectedCity.split(' ');


    return [
      title, description, createdDate, latitudeCity, longitudeCity, city,
      prevImg, image, isPremium,
      isFavorite, rating, type, rooms,
      guests, price, goods, email, name,
      avatarUrl, userType, countReviews, latitude, longitude
    ].join('\t');
  }
}
