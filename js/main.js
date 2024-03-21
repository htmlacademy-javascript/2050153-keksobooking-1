import { showAlertMessage } from './util.js';
// import { getObjects } from './data.js';
import { renderCard } from './popup.js';
import { disableForm, disableFilters, activateFilters } from './form.js';
import './validate-form-fields.js';
import { resetForm, setOnFormSubmit } from './validate-form.js';
import { initMap } from './map.js';
import './form-fields.js';
import { getData, sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './submit-message.js';

disableForm();

setOnFormSubmit (async (data) => {
  try {
    await sendData(data);
    showSuccessMessage();
    resetForm();
  } catch {
    showErrorMessage();
  }
});

disableFilters();
disableForm();
initMap();

try {
  const data = await getData();
  renderCard(data);
  activateFilters();
} catch (err) {
  // console.error(err);
  showAlertMessage(err.message);
}
