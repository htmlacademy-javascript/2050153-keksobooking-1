// const body = document.querySelector('body');

const form = document.querySelector('.ad-form');
const formElements = form.querySelectorAll('.ad-form__element');
// const formSlider = form.querySelector('.ad-form__slider');

const map = document.querySelector('.map');
// const mapCanvas = document.querySelector('.map__canvas');
const mapFilter = map.querySelector('.map__filters');
const mapFilterElements = mapFilter.querySelectorAll('.map__filter');

function disableForm () {
  form.classList.add('ad-form--disabled');
  formElements.forEach((formElement)=> {
    formElement.setAttribute('disabled', 'disabled');
  });
  // formSlider.setAttribute('disabled', 'disabled');
  // document.removeEventListener('change');
}

function disableFilters () {
  mapFilter.classList.add('map__filters--disabled');
  mapFilterElements.forEach((filter)=> {
    filter.setAttribute('disabled', 'disabled');
  });

  // document.removeEventListener('change');
}

function activateForm () {
  form.classList.remove('ad-form--disabled');
  formElements.forEach((formElement)=> {
    formElement.removeAttribute('disabled');
  });
  // formSlider.removeAttribute('disabled');
  // document.addEventListener('change');
}

function activateFilters () {
  mapFilter.classList.remove('map__filters--disabled');
  mapFilterElements.forEach((filter)=> {
    filter.removeAttribute('disabled');
  });

  // document.addEventListener('change');
}

// // При открытии страница находится в неактивном состоянии
// body.addEventListener('DOMContentLoaded', () => {
//   if (document.readyState === 'complete') {
//     disableForm();
//     disableFilters();
//   }
// });

// // Успешная инициализация карты (карта реализуется сторонней библиотекой Leaflet) переводит форму заполнения информации об объявлении в активное состояние.
// mapCanvas.addEventListener('change', (evt) => {
//   evt.preventDefault();

//   if (mapCanvas.readyState === 'complete') {
//     activateForm();
//   }
// });

// // Успешная загрузка данных об объявлениях с сервера переводит в активное состояние фильтры.
// mapFilter.addEventListener('change', (evt) => {
//   evt.preventDefault();

//   activateFilters();
// });

export {
  disableForm,
  disableFilters,
  activateForm,
  activateFilters
};
