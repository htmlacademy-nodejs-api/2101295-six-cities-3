import dayjs from 'dayjs';
import { MockData } from '../../types/mock-data.type.js';
import {OfferPrice, conveniences, OfferRoomsCount, OfferGuestsCount, OfferRating, WeekDay, ReviewsCount, CityLocation} from './offer-generator.const.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdDate = dayjs().subtract(generateRandomValue(WeekDay.First, WeekDay.Last), 'day').toISOString();
    const prevImg = getRandomItem<string>(this.mockData.prevImages);
    const image = getRandomItems<string>(this.mockData.images, 6).join(';');
    const isPremium = getRandomItem<string>(['true','false']);
    const isFavorite = getRandomItem<string>(['true','false']);
    const rating = generateRandomValue(OfferRating.Min, OfferRating.Max, 1).toString();
    const type = getRandomItem(['apartment', 'house', 'room', 'hotel']);
    const rooms = generateRandomValue(OfferRoomsCount.Min, OfferRoomsCount.Max).toString();
    const guests = generateRandomValue(OfferGuestsCount.Min, OfferGuestsCount.Max).toString();
    const price = generateRandomValue(OfferPrice.Min, OfferPrice.Max).toString();
    const goods = getRandomItems<string>(conveniences).join(';');
    const name = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarUrl = getRandomItem<string>(this.mockData.avatars);
    const userType = getRandomItem(['standart', 'pro']);
    const countReviews = generateRandomValue(ReviewsCount.Min, ReviewsCount.Max);
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
