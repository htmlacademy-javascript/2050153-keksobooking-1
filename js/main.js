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
const OBJECTS_LENGTH = 10;
const LOCATION_DOT_FIXED = 5;

let avatarIndex = 0;

// получение случайного цисла из диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// генерирование случайного цисла из диапазона
function createRandomNumber (a, b) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(a, b);
    if (previousValues.length >= (b - a + 1)) {
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

// получение случайного значения из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// получение массива случайной длины из значений
const getArrayFromRandomElements = (chosenArrey) => Array.from(
  { length: getRandomInteger(0, chosenArrey.length - 1) },
  () => getRandomArrayElement(chosenArrey),
).join(', ');

// получение случайного цисла из диапазона для локации с плавающей точкой, локации не повторяются
const getRandomInRange = (from, to, dotFixed) => {
  const previousValues = [];
  // .toFixed() returns string, so ' * 1' is a trick to convert to number;
  let rendomNumber = (Math.random() * (to - from) + from).toFixed(dotFixed) * 1;
  if (rendomNumber < 0 || to < from) {
    return NaN;
  }
  if (previousValues.length >= (to - from + 1)) {
    console.error(`Перебраны все локации из диапазона от ${ from } до ${ to }`);
    return null;
  }
  while (previousValues.includes(rendomNumber)) {
    rendomNumber = (Math.random() * (to - from) + from).toFixed(dotFixed) * 1;
  }
  previousValues.push(rendomNumber);
  return rendomNumber;
};

// получение рендомного числа от 1 до 10. Перед однозначными числами ставится 0.
// Например, 01, 02...10.
const getAvatarIndex = () => {
  avatarIndex = getRandomInteger(AVATAR_MIN_INDEX, AVATAR_MAX_INDEX);
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

const getAuthor = () => ({
  avatarIndex: getAvatarIndex(),
  avatar: createAvatarAdress(),
});

const getLocation = (lat, lng) => ({
  lat: lat,
  lng: lng,
});

const getOffer = (lat, lng) => ({
  title: getRandomArrayElement(OFFER_TITLE),
  address: lat, lng,
  price: `${ createRandomNumber(0, OFFER_PRICE_MAX)() } руб`,
  type: getRandomArrayElement(OFFER_TYPE),
  rooms: createRandomNumber(0, OFFER_ROOMS_MAX)(),
  guests: createRandomNumber(1, OFFER_GUESTS_MAX)(),
  checkin: checkinTime,
  checkout: checkout(checkinTime),
  features: getArrayFromRandomElements(OFFER_FEATURES),
  description: getArrayFromRandomElements(OFFER_DESCRIPTION),
  photos: getArrayFromRandomElements(OFFER_PHOTOS),
});

const createObject = (lat, lng) => {
  lat = getRandomInRange(LOCATION_LAT_MIN, LOCATION_LAT_MAX, LOCATION_DOT_FIXED);
  lng = getRandomInRange(LOCATION_LNG_MIN, LOCATION_LNG_MAX, LOCATION_DOT_FIXED);
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

getObjects();
