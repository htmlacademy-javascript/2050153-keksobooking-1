const form = document.querySelector('.ad-form');
const formFieldAddress = form.querySelector('#address');
const adPrice = form.querySelector('#price');
const sliderElement = form.querySelector('.ad-form__slider');

// поле адреса
const addAddress = (coordinateObj) => {
  formFieldAddress.value = `${ coordinateObj.lat }, ${ coordinateObj.lng }`;
  formFieldAddress.setAttribute('readonly', true);
};

// поле цены
// реализация слайдера для цены, используем noUiSlider
adPrice.value = adPrice.placeholder;

const onSliderUpdate = () => {
  adPrice.value = sliderElement.noUiSlider.get();
};

const createSlider = (min, max) => {
  noUiSlider.create(sliderElement, {
    range: { min, max },
    step: 1,
    start: max,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  sliderElement.noUiSlider.on('update', onSliderUpdate);
};

const destroySlider = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
};

const updateSlider = (min, max) => {
  destroySlider();
  createSlider(min, max);
};

export { addAddress, destroySlider, updateSlider };
