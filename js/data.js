import {
  getRandomInteger,
  getRandomArrayElement,
  getArrayFromRandomElements,
} from './util.js';

const LOCATION_LAT_MIN = 35.65000;
const LOCATION_LAT_MAX = 35.70000;
const LOCATION_LNG_MIN = 139.70000;
const LOCATION_LNG_MAX = 139.80000;
const LOCATION_PRECISION = 5;

const AVATAR_MIN_INDEX = 1;
const AVATAR_MAX_INDEX = 10;

const OFFER_PRICE_MAX = 100000;
const OFFER_ROOMS_MAX = 4;
const OFFER_GUESTS_MAX = 10;

const OBJECTS_LENGTH = 10;

const OfferByType = {
  PALACE: 'palace',
  FLAT: 'flat',
  HOUSE: 'house',
  BUNGALOW: 'bungalow',
  HOTEL: 'hotel',
};

const OFFER = {
  [OfferByType.PALACE]: {
    type: 'Дворец',
    title: 'Дворец посуточно',
    description: [
      'Шикарный дворец в центре с видом на парк',
      'Уютный дворец с видом на парк',
      'Дворец с видом на озеро'
    ]
  },
  [OfferByType.FLAT]: {
    type: 'Квартира',
    title: 'Квартира посуточно',
    description: [
      'Шикарная квартира в центре с видом на достопримечательности',
      'Шикарная квартира в центре с видом на парк',
      'Уютная квартира с видом на парк'
    ]
  },
  [OfferByType.HOUSE]: {
    type: 'Дом',
    title: 'Уютный дом в аренду',
    description: [
      'Уютный, совремменный дом в элитном районе в окружении парка',
      'Cовремменный дом в элитном районе',
      'Уютный дом в окружении парка'
    ]
  },
  [OfferByType.BUNGALOW]: {
    type: 'Бунгало',
    title: 'Уютное бунгало в аренду',
    description: [
      'Уютное, совремменное бунгало на склоне горы с шикарным видом на водопад',
      'Cовремменное бунгало с шикарным видом на водопад',
      'Уютное бунгало на склоне горы',
    ]
  },
  [OfferByType.HOTEL]: {
    type: 'Отель',
    title: 'Номер в отеле',
    description: [
      'Уютный, совремменный отель прямо в центре города',
      'Cовремменный отель прямо в центре города',
      'Стильный отель прямо рядом с бутиками'
    ]
  }
};

const OFFER_CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const OFFER_CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

let avatarIndex = 0;

// генерирование случайного цисла из диапазона
function createRandomNumber (a, b) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(a, b);
    if (previousValues.length >= (b - a + 1)) {
      // eslint-disable-next-line no-console
      console.error(`Перебраны все числа из диапазона от ${ a } до ${ b }`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(a, b);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

// получение случайного цисла из диапазона для локации с плавающей точкой, локации не повторяются
const getRandomInRange = (from, to, precision) => {
  const previousValues = [];

  let randomNumber = Number((Math.random() * (to - from) + from).toFixed(precision));
  if (randomNumber < 0 || to < from) {
    return NaN;
  }
  if (previousValues.length >= (to - from + 1)) {
    // eslint-disable-next-line no-console
    console.error(`Перебраны все локации из диапазона от ${ from } до ${ to }`);
    return null;
  }
  while (previousValues.includes(randomNumber)) {
    randomNumber = Number((Math.random() * (to - from) + from).toFixed(precision));
  }
  previousValues.push(randomNumber);
  return randomNumber;
};

// получение рендомного числа от 1 до 10. Перед однозначными числами ставится 0.
// Например, 01, 02...10.
const getAvatarIndex = () => {
  avatarIndex = getRandomInteger(AVATAR_MIN_INDEX, AVATAR_MAX_INDEX);
  if (avatarIndex < AVATAR_MAX_INDEX) {
    const currentAvatarIndex = `0${ avatarIndex }`;
    avatarIndex = currentAvatarIndex;
  }
  return avatarIndex.toString();
};

// Адреса изображений не повторяются.
const createAvatarAddress = () => {
  const previousValues = [];
  const currentValue = `img/avatars/user${ avatarIndex }.png`;
  if (previousValues.includes(currentValue)) {
    // eslint-disable-next-line no-console
    console.error('Этот адресс не уникален, выбери другой');
    return null;
  }
  previousValues.push(currentValue);
  return currentValue;
};

// время на выезд должно быть меньше или равно времени на вьезд.
const getCheckoutTime = (checkinTime) => {
  for (let checkoutTime of OFFER_CHECKOUT_TIME) {
    const hourCheckout = Number(checkoutTime.slice(0, 2));
    const hourCheckin = Number(checkinTime.slice(0, 2));
    if (hourCheckout < hourCheckin) {
      checkoutTime = `${(hourCheckin - 1)}:00`;
      return checkoutTime;
    }
    if (hourCheckout === hourCheckin) {
      return checkoutTime;
    }
  }
};

const getAuthor = () => ({
  avatarIndex: getAvatarIndex(),
  avatar: createAvatarAddress(),
});

const getLocation = (lat, lng) => ({
  lat: lat,
  lng: lng,
});

const getOffer = (lat, lng) => {
  const type = getRandomArrayElement(Object.values(OfferByType));
  const checkin = getRandomArrayElement(OFFER_CHECKIN_TIME);
  return {
    title: OFFER[type].title,
    address: `${ lat }, ${ lng }`,
    price: `${ createRandomNumber(0, OFFER_PRICE_MAX)() } руб`,
    type: OFFER[type].type,
    rooms: createRandomNumber(0, OFFER_ROOMS_MAX)(),
    guests: createRandomNumber(1, OFFER_GUESTS_MAX)(),
    checkin,
    checkout: getCheckoutTime(checkin),
    features: getArrayFromRandomElements(OFFER_FEATURES),
    description: getRandomArrayElement(OFFER[type].description),
    photos: getArrayFromRandomElements(OFFER_PHOTOS),
  };
};

const createObject = () => {
  const lat = getRandomInRange(LOCATION_LAT_MIN, LOCATION_LAT_MAX, LOCATION_PRECISION);
  const lng = getRandomInRange(LOCATION_LNG_MIN, LOCATION_LNG_MAX, LOCATION_PRECISION);

  return {
    author: getAuthor(),
    location: getLocation(lat, lng),
    offer: getOffer(lat, lng)
  };
};

const getObjects = () => Array.from(
  { length: OBJECTS_LENGTH },
  createObject
);

export { getObjects };
