import { readFileSync } from 'fs';
//import { OfferType } from '../../types/offer-type.enum.js';
import { Offer } from '../../types/offer.type.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([
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
        countReviews,
        latitude,
        longitude
      ]) => ({
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
        user: {email, name, avatarUrl},
        countReviews: Number.parseFloat(countReviews),
        location: {latitude: Number.parseFloat(latitude), longitude: Number.parseFloat(longitude)},
      }));
  }
}
