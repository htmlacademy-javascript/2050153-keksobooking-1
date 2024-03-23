const MAX_PRICE = 100000;

const form = document.querySelector('.ad-form');
const formFieldAddress = form.querySelector('#address');
const adPrice = form.querySelector('#price');
const sliderElement = form.querySelector('.ad-form__slider');

// поле адреса
const updateAddressField = (coordinateObj) => {
  formFieldAddress.value = `${ coordinateObj.lat }, ${ coordinateObj.lng }`;
  formFieldAddress.setAttribute('readonly', true);
};

// поле цены
// реализация слайдера для цены, используем noUiSlider
adPrice.value = adPrice.placeholder;

const onSliderUpdate = () => {
  adPrice.value = sliderElement.noUiSlider.get();
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: Number(adPrice.placeholder),
      max: MAX_PRICE
    },
    step: 1,
    start: adPrice.value,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return Math.round(value);
      },
    },
  });
  sliderElement.noUiSlider.on('slide', onSliderUpdate);
};

const updateSlider = (newMinValue) => {
  sliderElement.noUiSlider.updateOptions({range:{min: newMinValue, max: MAX_PRICE}, start: adPrice.value});
};

adPrice.addEventListener('input', (evt) => {
  sliderElement.noUiSlider.set(evt.target.value);
});

export { updateAddressField, createSlider, updateSlider };
