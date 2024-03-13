import { showAlertMessage } from './util.js';
// import { getObjects } from './data.js';
import { renderCard } from './popup.js';
import { disableFilters, activateFilters } from './form.js';
import './validate-form-fields.js';
import { setOnFormSubmit } from './validate-form.js';
import './map.js';
import './form-fields.js';
import { getData, sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './submit-message.js';

setOnFormSubmit (async (data) => {
  try {
    await sendData(data);
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  renderCard(data);
  activateFilters();
} catch (err) {
  showAlertMessage(err.message);
  disableFilters();
}
