import OfferDto from '../dto/offer-dto/offers-dto';
import ReviewDto from '../dto/review-dto/review-dto.js';
import UserDto from '../dto/user-dto/user-dto';
import { Host, Offer, Comment} from '../types/types';


export const adaptOffersToClient =
  (offers: OfferDto[]): Offer[] =>
    offers
      .map((offer: OfferDto) => ({
        id: offer.id.toString(),
        title: offer.title,
        description: offer.description,
        price: offer.price,
        rating: offer.rating,
        isPremium: offer.isPremium,
        isFavorite: offer.isFavorite,
        city: {
          name: offer.city.nameCity,
          location: {
            latitude: offer.city.latitudeCity,
            longitude: offer.city.longitudeCity
          }
        },
        location: offer.location,
        previewImage: offer.previewImage,
        type: offer.type,
        bedrooms: offer.bedrooms,
        goods: offer.conveniences,
        host: adaptUserToClient(offer.user),
        images: offer.images,
        maxAdults: offer.maxAdults
      }));

export const adaptOfferToClient =
  (offer: OfferDto): Offer => ({
    id: offer.id.toString(),
    price: offer.price,
    rating: offer.rating,
    title: offer.title,
    isPremium: offer.isPremium,
    isFavorite: offer.isFavorite,
    city: {
      name: offer.city.nameCity,
      location: {
        latitude: offer.city.latitudeCity,
        longitude: offer.city.longitudeCity
      }
    },
    location: offer.location,
    previewImage: offer.previewImage,
    type: offer.type,
    bedrooms: offer.bedrooms,
    description: offer.description,
    goods: offer.conveniences?.map((el) => el.toString()),
    host: adaptUserToClient(offer.user),
    images: offer.images,
    maxAdults: offer.maxAdults
  });

export const adaptUserToClient =
  (user: UserDto): Host => ({
    name: user.name,
    email: user.email,
    type: user.typeUser,
    avatarUrl: user.avatarUrl,
  }
  );

export const adaptReviewsToClient =
  (comments: ReviewDto[]): Comment[] =>
    comments.map((comment) => ({
      id: comment.id,
      comment: comment.text,
      date: comment.date,
      rating: comment.rating,
      user: {
        name: comment.user.name,
        email: comment.user.email,
        avatarUrl: comment.user.avatarUrl,
        type: comment.user.type,
      },
    }));

export const adaptReviewToClient =
  (comment: ReviewDto): Comment => ({
    id: comment.id,
    comment: comment.text,
    date: comment.date,
    rating: comment.rating,
    user: {
      name: comment.user.name,
      email: comment.user.email,
      avatarUrl: comment.user.avatarUrl,
      type: comment.user.type,
    },
  });

