import { createSlider } from './form-fields.js';

const form = document.querySelector('.ad-form');
const formHeader = form.querySelector('.ad-form-header');
const formElements = form.querySelectorAll('.ad-form__element');

const map = document.querySelector('.map');
const mapFilter = map.querySelector('.map__filters');
const mapFilterElements = mapFilter.querySelectorAll('.map__filter');
const mapFilterFeatures = map.querySelector('.map__features');

const disableForm = () => {
  form.classList.add('ad-form--disabled');
  formHeader.setAttribute('disabled', 'disabled');
  formElements.forEach((formElement)=> {
    formElement.setAttribute('disabled', 'disabled');
  });
};

const disableFilters = () => {
  mapFilter.classList.add('map__filters--disabled');
  mapFilterFeatures.setAttribute('disabled', 'disabled');
  mapFilterElements.forEach((filter)=> {
    filter.setAttribute('disabled', 'disabled');
  });
};

const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  formHeader.removeAttribute('disabled');
  formElements.forEach((formElement)=> {
    formElement.removeAttribute('disabled');
  });
  createSlider();
};

const activateFilters = () => {
  mapFilter.classList.remove('map__filters--disabled');
  mapFilterFeatures.removeAttribute('disabled');
  mapFilterElements.forEach((filter)=> {
    filter.removeAttribute('disabled');
  });
};

export {
  disableForm,
  disableFilters,
  activateForm,
  activateFilters
};
