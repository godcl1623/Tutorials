/* eslint-disable prettier/prettier */
/* eslint-disable strict */

'use strict';

function loadItems() {
  return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}

function createHTMLStrings(items) {
  return `
    <li class="clothes">
      <figure class="icon"><img src="${items.image}" alt="${items.type}" class="lists__thunbnail"></figure>
      <h3 class="lists__description">${items.gender}, ${items.size}</h3>
    </li>
  `;
}

function displayItems(items) {
  const container = document.querySelector('.lists-container');
  const html = items.map(item => createHTMLStrings(item)).join('');
  console.log(html);
  container.innerHTML = items.map(item => createHTMLStrings(item)).join('');
}

loadItems()
  .then(items => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);