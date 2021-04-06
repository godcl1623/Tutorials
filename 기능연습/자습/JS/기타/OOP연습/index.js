/* eslint-disable strict */

'use strict';

const body = document.querySelector('body');

function clicked() {
  return console.log('button has clicked!');
}

class Test {
  constructor(ul, li, input, p, button) {
    this.ul = ul;
    this.li = li;
    this.input = input;
    this.p = p;
    this.button = button;
  }

  changed() {
    console.log(`${this.input} state has changed`);
  }

  testest(event) {
    console.log(event.target);
  }

  makeList() {
    const $ul = document.createElement(this.ul);
    $ul.classList.add(`todo__container__${this.ul}`);
    const $li = document.createElement(this.li);
    $li.classList.add(`todo__container__${this.li}`);
    const $input = document.createElement(this.input);
    $input.type = 'checkbox';
    $input.addEventListener('change', this.changed);
    $input.classList.add(`todo__container__${this.input}`);
    const $p = document.createElement(this.p);
    $p.classList.add(`todo__container__${this.p}`);
    $p.textContent = `element type: ${this.p}`;
    const $button = document.createElement(this.button);
    $button.classList.add(`todo__container__${this.button}`);
    $button.textContent = `element type: ${this.button}`;
    $button.addEventListener('click', clicked);
    $button.addEventListener('click', this.testest);
    $li.appendChild($input);
    $li.appendChild($p);
    $li.appendChild($button);
    $ul.appendChild($li);
    return $ul;
  }
}

// const test = new Test('ul', 'li', 'input', 'p', 'button');
// body.appendChild(test.makeList());

class Test2 {
  constructor(eleType) {
    this.eleType = eleType;
  }

  makeElement() {
    return document.createElement(this.eleType);
  }

  putClass(target) {
    return target.classList.add(`todo__container__${this.eleType}`);
  }
}

class Test3 extends Test2 {
  constrtuctor() {
    this.checkbox = '';
    this.string = '';
    this.eventType = '';
    this.functionVar = '';
  }

  putType(target, type) {
    // this.checkbox = type;
    // target.type = this.checkbox;
    target.type = type;
    return target.type;
  }

  textIs(target, string) {
    this.string = string;
    target.textContent = this.string;
    return target.textContent;
  }

  putEventListener(target, eventType, functionVar) {
    this.eventType = eventType;
    this.functionVar = functionVar;
    return target.addEventListener(eventType, functionVar);
  }
}

const test2 = new Test2('ul');
const test22 = new Test2('li');
const test3 = new Test3('input');
const test31 = new Test3('p');
const test32 = new Test3('button');
for (let i = 0; i < 5; i++) {
  const $ul = test2.makeElement();
  const $li = test22.makeElement();
  const $input = test3.makeElement();
  const $p = test31.makeElement();
  const $button = test32.makeElement();
  test2.putClass($ul);
  test22.putClass($li);
  test3.putClass($input);
  test3.putType($input, 'checkbox');
  test31.putClass($p);
  test31.textIs($p, `element type: p`);
  test32.putClass($button);
  test32.textIs($button, `element type: button`);
  test32.putEventListener($button, 'click', () => {console.log('test')});
  $li.appendChild($input);
  $li.appendChild($p);
  $li.appendChild($button);
  $ul.appendChild($li);
  body.appendChild($ul);
}
