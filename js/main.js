import './util.js';
import { getObjects } from './data.js';
import { renderCard } from './popup.js';
// import './data.js';
// import './popup.js';
import './form.js';
import './validate-form-fields.js';
import { setOnFormSubmit } from './validate-form.js';
import './map.js';
import './form-fields.js';

renderCard(getObjects());
setOnFormSubmit();
