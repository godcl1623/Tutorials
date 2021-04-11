function myFunction(x, y, z) { }
var args = [0, 1, 2];
myFunction.apply(null, args); // this

function testFunction(...args) {}
testFunction();
