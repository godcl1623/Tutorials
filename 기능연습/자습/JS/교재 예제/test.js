'use strict';

const calculator = function (operator, a, b) {
	switch (operator) {
		case '+' :
			return a + b;
		case '-' :
			return a - b;
		case '*' :
			return a * b;
		case '/' :
			return a / b;
		case '%' :
			return a % b;
		default:
			throw alert('Invalid operator. Try with different One !');
	}
};
