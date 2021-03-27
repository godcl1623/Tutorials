/* eslint-disable strict */

'use strict';

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
	await delay(2000);
	// throw 'error';
	return 'apple';
}

async function getBanana() {
	await delay(1000);
	return 'banana';
}

/*function pickFruits() {
	return getApple().then(apple => {
		return getBanana().then(banana => `${apple} + ${banana}`);
	});
}*/

async function pickFruits() {
	try {
		const applePromise = getApple();
		const bananaPromise = getBanana();
		const apple = await applePromise;
		const banana = await bananaPromise;
		return Promise.race([getApple(), getBanana()]);
			// .then(fruits => fruits.join('+'));
	} catch(error) {
		console.log('error');
	}
}

pickFruits().then(console.log);
