/* eslint-disable strict */

'use strict';

function evenNumber() {
	for (let i = 0; i <= 10; i++) {
		if (i % 2 === 0) {
			console.log(i);
		} else {
			continue;
		}
	}
}

evenNumber();

function untilEight() {
	for (let i = 0; i <= 10; i++) {
		if (i > 8) {
			break;
		}
			console.log(i);
	}
}

untilEight();
