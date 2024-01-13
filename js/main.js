/*
// я попыталась сделать title & description через сложные объекты по типу, но у меня ни чего не вышло, пришлось упростить

// const OfferByType = {
//   PALACE: 'palace',
//   FLAT: 'flat',
//   HOUSE: 'house',
//   BUNGALOW: 'bungalow',
//   HOTEL: 'hotel',
// };

const OFFER = [
  [OFFER_TYPE[palace]]: {
    title: 'Aпартаменты посуточно',
    description: [
      'Шикарные апартаменты в центре с видом на парк',
      'Уютные апартаменты с видом на парк',
      'Апартаменты с видом на озеро'
    ]
  },
  [OfferByType.FLAT]: {
    title: 'Квартира посуточно',
    description: [
      'Шикарная квартира в центре с видом на достопримечательности',
      'Шикарная квартира в центре с видом на парк',
      'Уютная квартира с видом на парк'
    ]
  },
  [OfferByType.HOUSE]: {
    title: 'Уютный дом в аренду',
    description: [
      'Уютный, совремменный дом в элитном районе в окружении парка',
      'Cовремменный дом в элитном районе',
      'Уютный дом в окружении парка'
    ]
  },
  [OfferByType.BUNGALOW]: {
    title: 'Уютный коттетж в аренду',
    description: [
      'Уютный, совремменный коттетж на склоне горы с шикарным видом на водопад',
      'Cовремменный коттетж с шикарным видом на водопад',
      'Уютный коттетж на склоне горы',
    ]
  },
  [OfferByType.HOTEL]: {
    title: 'Номер в отеле',
    description: [
      'Уютный, совремменный отель прямо в центре города',
      'Cовремменный отель прямо в центре города',
      'Стильный отель прямо рядом с бутиками'
    ]
  }
];

function getCorrectOffer () {
  const chosenTypeKey = type.toUpperCase();
  const chosenType = `OfferByType.${chosenTypeKey}`;
}
*/

const OFFER_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

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

const OFFER_TITLE = [
  'Спешите! Новогодняя акция. Скидки!!!',
  'Просторная, уютная',
  'Будет доступна через месяц',
  'Только сегодня скидка на недельное проживание!!!'
];

const OFFER_DESCRIPTION = [
  'Просторная',
  'Уютная',
  '5 минут до торгового центра',
  'Недалеко кинотеатр',
  'Недалеко парк',
  '10 минут до станции метро',
  'Рядом с центром',
  'Свежий ремонт'
];

const LOCATION_LAT_MIN = 35.65000;
const LOCATION_LAT_MAX = 35.70000;
const LOCATION_LNG_MIN = 139.70000;
const LOCATION_LNG_MAX = 139.80000;

const OFFER_PRICE_MAX = 1000000;
const OFFER_ROOMS_MAX = 10;
const OFFER_GUESTS_MAX = 30;
const AVATAR_MIN_INDEX = 1;
const AVATAR_MAX_INDEX = 10;

let avatarIndex = 0;

// получение случайного цисла из диапазона
const getRandomRoundInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// получение случайного цисла из диапазона для локации с плавающей точкой
const getRandomLocationInteger = (a, b) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const result = Math.random() * (upper - lower) + lower;
  return parseFloat(result.toFixed(5));
};

// генерирование случайного цисла из диапазона
function createRandomRoundNumber (a, b) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomRoundInteger(a, b);
    if (previousValues.length >= (b - a + 1)) {
      console.error(`Перебраны все числа из диапазона от ${ a } до ${ b }`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomRoundInteger(a, b);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

// получение случайного значения из массива
const getRandomArrayElement = (elements) => elements[getRandomRoundInteger(0, elements.length - 1)];

// получение массива случайной длины из значений
const getArrayFromRandomElements = (chosenArrey) => Array.from(
  { length: getRandomRoundInteger(0, chosenArrey.length - 1) },
  () => getRandomArrayElement(chosenArrey),
).join(', ');

// получение рендомного числа от 1 до 10. Перед однозначными числами ставится 0.
// Например, 01, 02...10.
const getAvatarIndex = () => {
  avatarIndex = getRandomRoundInteger(AVATAR_MIN_INDEX, AVATAR_MAX_INDEX);
  if (avatarIndex < AVATAR_MAX_INDEX) {
    const currentAvatarIndex = `0${ avatarIndex}`;
    avatarIndex = currentAvatarIndex;
  }
  return avatarIndex;
};

// Адреса изображений не повторяются.
const createAvatarAdress = () => {
  const previousValues = [];
  const currentValue = `img/avatars/user${ avatarIndex }.png`;
  if (previousValues.includes(currentValue)) {
    console.error('Этот адресс не уникален, выбери другой');
    return null;
  }
  previousValues.push(currentValue);
  return currentValue;
};

// получение время на въезд
const checkinTime = getRandomArrayElement(OFFER_CHECKIN_TIME);

// время на выезд должно быть меньше или равно времени на вьезд.
const checkout = () => {
  for (const checkoutTime of OFFER_CHECKOUT_TIME) {
    const hourCheckout = +checkoutTime.slice(0, 2);
    const hourCheckin = +checkinTime.slice(0, 2);
    if (hourCheckout >= hourCheckin) {
      return checkoutTime;
    }
  }
};

const locationLat = getRandomLocationInteger(LOCATION_LAT_MIN, LOCATION_LAT_MAX);
const locationLng = getRandomLocationInteger(LOCATION_LNG_MIN, LOCATION_LNG_MAX);

const createAuthor = () => ({
  avatarIndex: getAvatarIndex(),
  avatar: createAvatarAdress(),
});

const createLocation = () => ({
  lat: locationLat,
  lng: locationLng,
});

const createOffer = () => ({
  title: getRandomArrayElement(OFFER_TITLE),
  address: `${ locationLat }, ${ locationLng }`,
  price: `${ createRandomRoundNumber(0, OFFER_PRICE_MAX)() } руб`,
  type: getRandomArrayElement(OFFER_TYPE),
  rooms: createRandomRoundNumber(0, OFFER_ROOMS_MAX)(),
  guests: createRandomRoundNumber(1, OFFER_GUESTS_MAX)(),
  checkin: checkinTime,
  checkout: checkout(checkinTime),
  features: getArrayFromRandomElements(OFFER_FEATURES),
  description: getArrayFromRandomElements(OFFER_DESCRIPTION),
  photos: getArrayFromRandomElements(OFFER_PHOTOS),
});

createAuthor();
createLocation();
createOffer();
