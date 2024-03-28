import { renderCards } from './popup.js';

const MAX_OFFER_COUNT = 10;

const FilterId = {
  TYPE: 'housing-type',
  PRICE: 'housing-price',
  ROOMS: 'housing-rooms',
  GUESTS: 'housing-guests',
  FEATURES: 'housing-features'
};

let offers = [];
let currentFilterId;

const filtersForm = document.querySelector('.map__filters');
// const filter = filters.querySelectorAll('.img-filter');

// фильтрация по имени(value) фильтра
const getFilterByName = (name, changedValue) => {
  switch (name) {
    case FilterId.TYPE:
      return (item) => item.Id === changedValue;
    // case FilterId.PRICE:
    //   return
  }
};

// фильтрация для выпадашек
// фильтрация по типу жилья
const sortByType = (loadedOffers) => {
  // const filteredOffers = [];
  // console.log(loadedOffer);
  // const filteredObj = Object.fromEntries(
  //   Object.entries(uploadOffer).filter(([key, value]) => {
  //     console.log(key);
  //     console.log(value);
      // if (value === OfferByType.value) {
      //   console.log(value);
      //   return uploadOffer;
        // filteredOffers.push(offer);
      // }
      // })
      // console.log(loadedOffer.offer.type);
      // console.log(filterValue.value);
      // if (loadedOffer.offer.type === filterValue[OfferByType.value]) {
      // //   // console.log(value);
      //   filteredOffers.push(loadedOffer);
      // }
  // );
  // uploadOffers.forEach((offer) => {
  //   // if (offer.type.includes(OfferByType.DEFAULT)) {
  //   //   return offer;
  //   // } else
  //   console.log(uploadOffers);
    // if (uploadOffer[offer.type.value] === OfferByType.value) {
    //   console.log(offer.type);
    //   return uploadOffer;
    //   // filteredOffers.push(offer);
    // }
  // });
  // return filteredOffers.slise(0, MAX_OFFER_COUNT);
  let result = [...loadedOffers];
  result = result.filter(getFilterByName());
  return result;
};

// // фильтрация по стоимости жилья
// const filterOffersByPrice = () => {
//   const filteredOffers = [];
//   offers.forEach((offer) => {
//     if (offer.value.includes(OfferByType.value)) {
//       filteredOffers.push(offer);
//     }
//   });
//   return filteredOffers;
// };


// const compareCommentsLength = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

// const getFeaturesRank = (features) => {
//   let rank = 0;

//   // const randomCards = [];
//   // while (randomCards.length < MAX_CARD_COUNT) {
//   //   const housingCard = getRandomArrayElement(uploadCards);
//   //   if (!randomCards.includes(housingCard)) {
//   //     randomCards.push(housingCard);
//   //   }
//   // }
//   // return randomCards;
// };


// функция применения нужного фильтра к предложениям по съему жилья
// [...offers] - делает поверхностное копирование всего масива с предложениями который пришел с сервера.
// Поверхностное копирование потомучто, мы будем изменять только порядок ссылок на массив данных, сами данные внутри мы менять не будем.
const getFilteredOffers = () => {
  switch (currentFilterId) {
    case FilterId.TYPE:
      return [...offers].sort(sortByType).slise(0, MAX_OFFER_COUNT);
    case FilterId.PRICE:
      return [...offers].sort(sortByPrice).slise(0, MAX_OFFER_COUNT);
    default: {
      // offers = Array.prototype.slice.call([...offers], 0, MAX_OFFER_COUNT);
      return offers;
    }
  }
}
// const getFilteredOffers = () => {
  // filters.addEventListener('change', (evt) => {
  //   const changedFilter = evt.target;
  //   console.log(changedFilter);

  //   currentFilterId = changedFilter.id;
  //   console.log(currentFilterId);
  //   if (changedFilter.id === currentFilterId) {
  //     return;
  //   }
    // if (currentFilterId === FilterId.TYPE) {
    //   return filterOffersByType(offers);
    // }
  // if (currentFilterId === FilterId.PRICE) {
  //   return [...pictures].sort(compareCommentsLength);
  // }
  // if (currentFilterId === FilterId.ROOMS) {
  //   return [...pictures].sort(compareCommentsLength);
  // }
  // if (currentFilterId === FilterId.GUESTS) {
  //   return [...pictures].sort(compareCommentsLength);
  // }
  // if (currentFilterId === FilterId.FEATURES) {
  //   return [...pictures].sort(compareCommentsLength);
  // }
  // if (currentFilterId === FilterId.DEFAULT) {
  //   return [...offers];
  // });
// };

// // функция нажатия на кнопки с фильрами
const setOnChangeFilters = () => {
  filtersForm.addEventListener('change', () => {
    // получаем значения из фильтров и исключаем дефолтные
    const changedFilters = [...new FormData(filtersForm).entries()]
      .filter(([key, value]) => value !== 'any');
    console.log(changedFilters);
    let result = [...offers];
    console.log(result);
    for (const changedFilter of changedFilters) {
      console.log(changedFilter);
      const [name, currentFilterValue] = changedFilter;
      result = result.filter(getFilterByName(name, currentFilterValue));
      console.log(result);
    }
    result.slice(0, MAX_OFFER_COUNT);
    renderCards(result);
    // console.log(currentFilterId);
    // cb(getFilteredOffers());
  });
};

// функция инициализации фильтров для загружаемых фотографий
const initOfferFilters = (loadedOffers, cb) => {
  offers = [...loadedOffers];
  setOnChangeFilters(cb);
};


export { getFilteredOffers, initOfferFilters };
