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

const createSlider = (fieldPlaceholder) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: Number(fieldPlaceholder),
      max: MAX_PRICE
    },
    step: 1,
    start: MAX_PRICE,
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
  updateSlider();
};

const destroySlider = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
};

const setSlider = (fieldPlaceholder) => {
  destroySlider();
  createSlider(fieldPlaceholder);
};

function updateSlider () {
  sliderElement.noUiSlider.on('update', onSliderUpdate);
}

export { updateAddressField, setSlider, updateSlider };
