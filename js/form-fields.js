const form = document.querySelector('.ad-form');
const formFieldAddress = form.querySelector('#address');

// поле адреса
const addAddress = (coordinateObj) => {
  formFieldAddress.value = `${ coordinateObj.lat }, ${ coordinateObj.lng }`;
  formFieldAddress.setAttribute('readonly', true);
};

export { addAddress };
