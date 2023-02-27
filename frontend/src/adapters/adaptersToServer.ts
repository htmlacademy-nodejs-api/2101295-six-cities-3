import CreateOfferDto from '../dto/offer-dto/create-offer.dto.js';
import CreateUserDto from '../dto/user-dto/create-user.dto';
import { User} from '../types/types';
import {NewOffer } from '../types/types';
import CreateReviewDto from '../dto/review-dto/create-review.dto';

export const adaptUserToServer =
  (user: User): CreateUserDto => ({
    name: user.name,
    email: user.email,
    avatarUrl: '',
    typeUser: user.type,
    password: user.password
  });

export const adaptAvatarToServer =
  (file: string) => {
    const formData = new FormData();
    formData.set('avatar', file);
    return formData;
  };

export const getTime = () => {
  const now = new Date();
  return now.toISOString();
};

export const adaptOffersToServer =
  (offer: NewOffer): CreateOfferDto => ({
    title: offer.title,
    description: offer.description,
    date: getTime(),
    price: offer.price,
    isPremium: offer.isPremium,
    city: {
      nameCity: offer.city.name,
      latitudeCity: offer.city.location.latitude,
      longitudeCity: offer.city.location.longitude
    },
    location: offer.location,
    previewImage: offer.previewImage,
    type: offer.type,
    bedrooms: offer.bedrooms,
    conveniences: offer.goods,
    images: offer.images,
    maxAdults: offer.maxAdults
  });

export const adaptCreateCommentToServer =
  (comment: {comment: string, rating: number}): CreateReviewDto => ({
    text: comment.comment,
    rating: comment.rating,
  });
