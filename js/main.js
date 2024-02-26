import './util.js';
import { getObjects } from './data.js';
import { renderCard } from './popup.js';
import './form.js';
import { setOnFormSubmit } from './validate-form.js';

renderCard(getObjects());
setOnFormSubmit();
