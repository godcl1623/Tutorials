/* eslint-disable strict */

'use strict';

const calculator = (num1, operator, num2) => {
	switch (operator) {
		case '+':
			return num1 + num2;
		case '-':
			return num1 - num2;
		case '*':
			return num1 * num2;
		case '/':
			return num1 / num2;
		case '%':
			return num1 % num2;
		default:
			throw Error('Invalid Operator');
	}
};

class User {
	constructor(firstName, lastName, age) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
	}
	// get age() {
	// 	return this._age;
	// }
	set name(value) {
		if (value < 0) {
			throw Error('age cannot be negative');
		} else {
			this._age = value;
		}
	}
}

const jobs = new User('Joshua', 'Lee', 28);
