import { showAlertMessage } from './util.js';

const MAX_PRICE = 100000;

const form = document.querySelector('.ad-form');
const formFieldAddress = form.querySelector('#address');
const formFieldPrice = form.querySelector('#price');
const sliderElement = form.querySelector('.ad-form__slider');
const formFieldAvatarInput = form.querySelector('.ad-form-header__input');
const formFieldAvatarDropZone = form.querySelector('.ad-form__field');
const avatarImgPreviewField = form.querySelector('.ad-form-header__preview');
const formFieldImgDropZone = form.querySelector('.ad-form__upload');
const formFieldImgInput = form.querySelector('.ad-form__input');
const imgPreviewField = form.querySelector('.ad-form__photo');

formFieldPrice.value = formFieldPrice.placeholder;

// поле адреса
const updateAddressField = (coordinateObj) => {
  formFieldAddress.value = `${ coordinateObj.lat }, ${ coordinateObj.lng }`;
  formFieldAddress.setAttribute('readonly', true);
};

// поле цены
// реализация слайдера для цены, используем noUiSlider
const onSliderUpdate = () => {
  formFieldPrice.value = sliderElement.noUiSlider.get();
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: Number(formFieldPrice.placeholder),
      max: MAX_PRICE
    },
    step: 1,
    start: formFieldPrice.value,
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
  sliderElement.noUiSlider.updateOptions({range:{min: newMinValue, max: MAX_PRICE}, start: formFieldPrice.value});
};

formFieldPrice.addEventListener('input', (evt) => {
  sliderElement.noUiSlider.set(evt.target.value);
});

// поля с загрузками фотографий
// проверка файла с фотографией для загрузки
const validateFile = (file, dropZone) => {
  const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
  const fileExtension = file.type.split('/')[1];
  const isValidFile = allowedExtensions.includes(fileExtension);
  if (!isValidFile) {
    showAlertMessage(`Подходящий формат Фотографии: *.${ allowedExtensions.join(', *.')}`, dropZone);
  }
  return isValidFile;
};

// добавление изображения в поле предпросмотра
const addNewImgPreview = (file, imgInput, imgDropZone, imgPreview) => {
  if (validateFile(file[0], imgDropZone)) {
    const newImg = document.createElement('img');
    newImg.src = URL.createObjectURL(file[0]);
    newImg.setAttribute('id', 'selected-img');
    if (imgInput.id === 'avatar') {
      newImg.width = '40';
      newImg.maxHeight = '40';
    } else if (imgInput.id === 'images') {
      newImg.maxWidth = '70';
      newImg.height = '70';
    }
    for (const child of imgPreview.children) {
      child.classList.add('visually-hidden');
    }
    imgPreview.append(newImg);
  }
};

// реализация предпросмотра фотографии при изменении поля для загрузки
const onImgUploadChange = (imgInput, imgDropZone, imgPreview) => {
  // при нажатии на загрузку
  imgInput.addEventListener('change', (evt) => {
    evt.preventDefault();

    const file = imgInput.files;
    addNewImgPreview(file, imgInput, imgDropZone, imgPreview);
  });
  // при перетаскивании файла с фотографией
  imgDropZone.addEventListener('dragover', (evt) => {
    evt.preventDefault(); // отменяем действие по умолчанию
  });
  imgDropZone.addEventListener('drop', (evt) => {
    evt.preventDefault();

    const files = evt.dataTransfer.files;
    if (files.length === 1) {
      addNewImgPreview(files, imgInput, imgDropZone, imgPreview);
    } else {
      showAlertMessage('Допускается не более одного файла', imgDropZone);
    }
  });
};

// удаление загруженной фотографии из предпросмотра
const removePreviewImg = (imgPreview) => {
  const selectedImg = document.querySelector('#selected-img');
  if (imgPreview.contains(selectedImg)) {
    selectedImg.remove();
    if (imgPreview === avatarImgPreviewField) {
      imgPreview.querySelector('.visually-hidden').classList.remove('visually-hidden');
    }
  }
};

// предпросмотр фотографии в зависимости от поля загрузки
const previewImgAvatar = () => onImgUploadChange(formFieldAvatarInput, formFieldAvatarDropZone, avatarImgPreviewField);

const previewImgAdPhoto = () => onImgUploadChange(formFieldImgInput, formFieldImgDropZone, imgPreviewField);

previewImgAvatar();
previewImgAdPhoto();

export { updateAddressField, createSlider, updateSlider, removePreviewImg };
