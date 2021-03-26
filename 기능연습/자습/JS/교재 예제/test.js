/* eslint-disable strict */

'use strict';

const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('hen'), 1000);
	});
const getEgg = hen =>
	new Promise((resolve, reject) => {
		// setTimeout(() => resolve(`${hen} => egg`), 1000);
		setTimeout(() => reject(new Error(`errpr! ${hen} => egg`)), 1000);
	});
const cook = egg =>
	new Promise((resolve, reject) => {
		setTimeout(() => resolve(`${egg} => fried egg`), 1000);
	});

getHen()
	.then(getEgg)
	.catch(error => {return 'bread';})
	.then(cook)
	.then(console.log)
	.catch(console.log);
