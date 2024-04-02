import { renderCards } from './popup.js';
import { debounce } from './util.js';

const DEFAULT_FILTERS_VALUE = 'any';

const FilterByName = {
  TYPE: 'housing-type',
  PRICE: 'housing-price',
  ROOMS: 'housing-rooms',
  GUESTS: 'housing-guests',
  FEATURES: 'features'
};

const FilterPriceRangeValue = {
  'low': [0, 10000],
  'middle': [10000, 50000],
  'high': [50000, 100000]
};

const filtersForm = document.querySelector('.map__filters');
const filters = filtersForm.querySelectorAll('.map__filter');
const feachers = filtersForm.querySelector('.map__features');
const feachersCheckboxes = feachers.querySelectorAll('input[name="features"]');

// используеться для проверки активного фильтра
const isActive = (value) => value !== DEFAULT_FILTERS_VALUE;

// фильтрация по имени фильтра и по его значению
const getFilterByName = (name, value) => {
  switch (name) {
    case FilterByName.TYPE: {
      return (item) => item.offer.type === value;
    }
    case FilterByName.PRICE: {
      const [min, max] = FilterPriceRangeValue[value];
      return (item) => min <= item.offer.price && item.offer.price < max;
    }
    case FilterByName.ROOMS: {
      return (item) => item.offer.rooms === Number(value);
    }
    case FilterByName.GUESTS: {
      return (item) => item.offer.guests === Number(value);
    }
    case FilterByName.FEATURES: {
      return (item) => {
        if (item.offer.features === undefined) {
          return false;
        }
        return item.offer.features.includes(value);
      };
    }
  }
};

const renderCardsDebounced = debounce(renderCards);

// функция срабатываемая при нажатия на кнопки с фильрами
const setOnChangeFilters = (offers) => {
  // получаем значения из фильтров
  const changedFilters = new FormData(filtersForm);
  // получаем значения из предложений
  let filteredOffers = [...offers];
  // фильтрация по имени и значению фильтра
  for (const entry of changedFilters.entries()) {
    const [ filterName, filterValue ] = entry;
    if (isActive(filterValue)) {
      filteredOffers = filteredOffers.filter(getFilterByName(filterName, filterValue));
    }
  }
  // переписываем видимые предложения согласно фильтрации
  renderCardsDebounced(filteredOffers);
};

const resetFilters = () => {
  filters.forEach((filter) => {
    if (isActive) {
      filter.value = DEFAULT_FILTERS_VALUE;
    }
  });
  feachersCheckboxes.forEach((feacher) => {
    if (feacher.checked) {
      feacher.checked = false;
    }
  });
};

// функция инициализации фильтров для загружаемых предложений
const initializeOfferFilters = (offers) => {
  filtersForm.addEventListener('change', () => setOnChangeFilters(offers));
};

export { initializeOfferFilters, resetFilters };
