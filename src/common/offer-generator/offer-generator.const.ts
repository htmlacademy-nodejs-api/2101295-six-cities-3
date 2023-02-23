export const conveniences = ['Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge'];

export enum OfferPrice {
  Min = 100,
  Max = 100000,
}

export enum OfferRating {
  Min = 1,
  Max = 5,
}

export enum OfferRoomsCount {
  Min = 1,
  Max = 8,
}

export enum OfferGuestsCount {
  Min = 1,
  Max = 10,
}

export enum WeekDay {
  First = 1,
  Last = 10,
}

export enum ReviewsCount {
  Min =0,
  Max = 15,
}

export const CityLocation = {
  Paris: ['48.85661 2.351499'],
  Cologne: ['50.938361 6.959974'],
  Brussels: ['50.846557 4.351697'],
  Amsterdam: ['52.370216 4.895168'],
  Hamburg: ['53.550341 10.000654'],
  Dusseldorf: ['51.225402 6.776314'],
} as const;

