//import { OfferType } from '../types/offer-type.enum.js';
import { Offer } from '../types/offer.type.js';
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
