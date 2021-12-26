{
  const jsFunc = (): any => {
    return 'hello';
  };

  const foo = jsFunc();
  
  // JS 호환을 위해 작성된 함수 - 리턴 타입이 any로 지정됐지만, 해당 함수의 리턴값은 언제나 string이라는 것을 아는 상황.
  const jsFunc = (): any => {
    return 'hello';
  }

  // 이 상태에서 jsFunc의 리턴 값을 활용해 string Api를 사용하려 해도, TS 규칙때문에 불가능함
  const foo = jsFunc(); // 원래대로라면 charAt, concat 등 String Api 사용이 가능한 상황이나, 실제 코드에서는 작성이 불가능

  // Type Assertion을 사용하면 String Api의 사용이 가능해짐
  (foo as string).length; // 5

  // Promise의 리턴 타입을 설정할 때처럼 <>를 이용할 수도 있음
  (<string>foo).length; // 5

  // 만약, jsFunc가 number 등 string 이외의 타입을 반환하지만 string으로 assertion한 상황인 경우
  (foo as string).length; // undefined

  // 위의 경우에는 undefined만 출력되고 끝났지만, 프로그램 자체가 뻗어버릴 수도 있음
  const wrong: any = 5;
  console.log((wrong as Array<number>)).push(1)); // 아예 오류 발생

  // 이런 활용 방법도 있음 - 정말 100% 확신 가능한 경우에만 사용
  function findNums(): numbers[] | undefined {
    return undefined;
  }

  const numbers = findNums();
  numbers.push(1); // 일반적으로 불가능
  numbers!.push(1);
  // const numbers = findNums()!;
  numbers.push(1); // 이렇게 할 경우 코딩 과정에서는 오류가 출력되지 않음

  // 확실하지 않은 경우에는 이렇게 됨
  const button = document.querySelector('.btns'); // querySelector는 .btns 클래스를 가진 요소가 존재하는 경우 해당 요소를, 그렇지 않은 경우 null을 반환
  button.nodeValue // 만약 button이 null이면 오류가 발생
  if (button) {
    button.nodeValue
  } // button이 null이 아닌 경우에만 이용 가능
  const button = document.querySelector('.btns')!; // 이렇게 작성할 경우, .btns 요소가 반드시 존재하는 경우에 한해 위 조건문 없어도 됨
}