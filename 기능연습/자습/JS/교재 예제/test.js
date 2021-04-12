function myFunction(x, y, z) { }
var args = [0, 1, 2];
myFunction.apply(null, args); // this

function testFunction(...args) {}
testFunction();

const $ds = document.createElement('button');
$ds.classList.add('test-button');
$ds.addEventListener('click', e => {console.log(e.propertyName)});
$ds.addEventListener('transitionend', e => {console.log(e.propertyName)});
const body = document.querySelector('body');
body.appendChild($ds);
