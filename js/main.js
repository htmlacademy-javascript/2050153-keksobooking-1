import { showAlertMessage } from './util.js';
import { renderCards } from './popup.js';
import { disableForm, disableFilters, activateFilters } from './activation.js';
import './validate-form-fields.js';
import { resetForm, setOnFormSubmit } from './form.js';
import { initMap, resetMap } from './map.js';
import './form-fields.js';
import { getData, sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './submit-message.js';
import { initializeOfferFilters, resetFilters } from './map-filters.js';

setOnFormSubmit (async (data) => {
  try {
    await sendData(data);
    showSuccessMessage();
    resetForm();
    resetMap();
    resetFilters();
  } catch {
    showErrorMessage();
  }
});

disableFilters();
disableForm();

try {
  const data = await getData();
  initMap();
  renderCards(data);
  activateFilters();
  initializeOfferFilters(data);
} catch (err) {
  showAlertMessage(err.message, document.body);
}
