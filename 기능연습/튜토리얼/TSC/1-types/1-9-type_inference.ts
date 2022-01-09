{
  /*
    타입 추론
  */
  let text = 'hello';
  text = 1; // 별도로 변수 text에 타입을 부여하지 않았음에도 ['number' 형식은 'string' 형식에 할당할 수 없습니다. ts(2322)] 오류 메세지 발생
  function print(message = 'hello') {
    console.log(message);
  }

  print('how low');
  print(1); // 파라미터 기본값 지정으로 인해 string 타입이 암묵적으로 부여됨

  // 파라미터에만 타입을 할당한 경우, 리턴 값은 이를 바탕으로 추론될 수 있음
  function add(x: number, y: number) {
    return x + y;
  }
  let foo = add(2, 3);
  foo = 'number'; // 위 add(2, 3)으로 인해 타입이 number로 추론된 상황
}
