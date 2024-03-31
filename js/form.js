import { createSlider } from './form-fields.js';

const form = document.querySelector('.ad-form');
const formElements = form.querySelectorAll('.ad-form__element');
// const adPrice = form.querySelector('#price');

const map = document.querySelector('.map');
const mapFilter = map.querySelector('.map__filters');
const mapFilterElements = mapFilter.querySelectorAll('.map__filter');

function disableForm () {
  form.classList.add('ad-form--disabled');
  formElements.forEach((formElement)=> {
    formElement.setAttribute('disabled', 'disabled');
  });
}

function disableFilters () {
  mapFilter.classList.add('map__filters--disabled');
  mapFilterElements.forEach((filter)=> {
    filter.setAttribute('disabled', 'disabled');
  });
}

function activateForm () {
  form.classList.remove('ad-form--disabled');
  formElements.forEach((formElement)=> {
    formElement.removeAttribute('disabled');
  });
  createSlider();
}

function activateFilters () {
  mapFilter.classList.remove('map__filters--disabled');
  mapFilterElements.forEach((filter)=> {
    filter.removeAttribute('disabled');
  });
}

export {
  disableForm,
  disableFilters,
  activateForm,
  activateFilters
};
