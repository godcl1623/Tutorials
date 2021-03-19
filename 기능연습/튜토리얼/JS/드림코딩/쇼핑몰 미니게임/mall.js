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
    <li class="clothes" data-type="${items.type}" data-color="${items.color}">
      <figure class="icon"><img src="${items.image}" alt="${items.type}" class="lists__thunbnail"></figure>
      <h3 class="lists__description">${items.gender}, ${items.size}</h3>
    </li>
  `;
}

function displayItems(items) {
  const container = document.querySelector('.lists-container');
  // const html = items.map(item => createHTMLStrings(item)).join('');
  // console.log(html);
  container.innerHTML = items.map(item => createHTMLStrings(item)).join('');
}

// function onButtonClick(event, items) {
//   const dataset = event.target.dataset;
//   const key = dataset.key;
//   const value = dataset.value;
//   if (key === undefined || value === undefined) {
//     return;
//   }
//     const filtered = items.filter(item => item[key] === value);
//     displayItems(filtered);
// }

function onButtonClick(event) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;
  if (key === undefined || value === undefined) {
    return;
  }
  const clothes = document.querySelectorAll('.clothes');
  const matchingType = Array.from(clothes)
    .filter(item => item.dataset.type === value)
    .map(item => item.dataset.type);
  const matchingColor = Array.from(clothes)
    .filter(item => item.dataset.color === value)
    .map(item => item.dataset.color);
  const matchingClothes = Array.from(clothes)
    .filter(item => item.dataset.type === value || item.dataset.color === value);
  const clothesOthers = Array.from(clothes)
    .filter(item => item.dataset.type !== value && item.dataset.color !== value);
  switch (true) {
    case matchingType.includes(value):
      matchingClothes.forEach(item => {item.style.display = 'flex'});
      clothesOthers.forEach(item => {item.style.display = 'none'});
      break;
    case matchingColor.includes(value):
      matchingClothes.forEach(item => {item.style.display = 'flex'});
      clothesOthers.forEach(item => {item.style.display = 'none'});
      break;
    default: break;
  }
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons-container');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', event => onButtonClick(event));
}

loadItems()
  .then(items => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);