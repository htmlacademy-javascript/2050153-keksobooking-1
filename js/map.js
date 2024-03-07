import { activateForm } from './form.js';
import { addAddress } from './form-fields.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 15;
const LOCATION_PRECISION = 5;

const mainIconConfig = {
  url: './img/main-pin.svg',
  width: 52,
  height: 52,
  anchorX: 26,
  anchorY: 52,
};

const postedIconConfig = {
  url: './img/pin.svg',
  width: 40,
  height: 40,
  anchorX: 20,
  anchorY: 40,
};

const cityCenter = {
  lat: 35.68118,
  lng: 139.76717,
};

const startCoordinate = {
  lat: 35.68118,
  lng: 139.76717,
};

let newCoordinate = startCoordinate;

const map = L.map('map-canvas')
  .on('load', () => {
    // console.log('Карта инициализирована');
    activateForm();
  })
  .setView(cityCenter, ZOOM);

L.tileLayer(TILE_LAYER, {
  attribution: COPYRIGHT
}).addTo(map);

const addPinIcon = (icon) => {
  const pinIcon = L.icon({
    iconUrl: icon.url,
    iconSize: [icon.width, icon.height],
    iconAnchor: [icon.anchorX, icon.anchorY],
  });
  return pinIcon;
};

const mainPinMarker = L.marker(startCoordinate, {
  draggable: true,
  icon: addPinIcon(mainIconConfig),
});

mainPinMarker.addTo(map);

const fixedNumberPrecision = (obj) => {
  const values = Object.values(obj);
  const result = [];
  values.forEach((value) => {
    const fixedValue = Number((value).toFixed(LOCATION_PRECISION));
    result.push(fixedValue);
  });
  obj.lat = result[0];
  obj.lng = result[1];
  return obj;
};

mainPinMarker.on('moveend', (evt) => {
  if (evt.target.getLatLng() !== startCoordinate) {
    newCoordinate = fixedNumberPrecision(evt.target.getLatLng());
    addAddress(newCoordinate);
  }
});

// const popup = L.popup();
// function onMapClick(e) {
//   popup
//     .setLatLng(e.latlng)
//     .setContent(e.content)
//     .openOn(map);
// }

const addPostedMarker = (location, content) => {
  const postedPinMarker = L.marker(location, {
    draggable: false,
    icon: addPinIcon(postedIconConfig),
  });

  postedPinMarker.addTo(map);
  postedPinMarker.bindPopup(content).openPopup();
  // postedPinMarker.on('click', onMapClick);
};

const resetMap = () => {
  map.setView(startCoordinate, ZOOM);
};

export { resetMap, addPostedMarker };
