/* eslint-disable prettier/prettier */
/* eslint-disable strict */

'use strict';

function loadItems() {
  return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}

loadItems()
  .then(items => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);