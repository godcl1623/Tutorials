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
  // constructor(ul) {
  //   this.ul = ul;
  // }

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
    const result = $ul.appendChild($li);
    return result;
    // return $ul;
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

  putClass() {
    const testVar = this.makeElement();
    testVar.classList.add(`todo__container__${this.eleType}`);
    return testVar;
  }

  returnResult() {
    const testVar2 = this.putClass();
    return testVar2;
  }
}

class Test3 extends Test2 {
  putType() {
    const testVar = this.makeElement();
    testVar.type = 'checkbox';
    return testVar.type;
  }

  textIs(string) {
    const testVar = this.makeElement();
    testVar.textContent = string;
    return testVar.textContent;
  }

  putEventListener(eventType, functionVar) {
    const testVar = this.makeElement();
    return testVar.addEventListener(eventType, functionVar);
  }
}
