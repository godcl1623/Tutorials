{
  /*
    ##### Intersection #####
    Union 타입이 가능한 경우 중 오직 하나의 경우만 값으로 갖는 것에 비해, Intersection 타입은 가능한 모든 경우를 값으로 갖는다.
    ※ 사용 방법:
      type 식별자 = 타입1 & 타입2
    ※ 주의 사항
      어떠한 변수의 타입이 Intersection 타입일 경우, 해당 변수는 Intersection 타입을 구성하는 다른 타입들을 모두 만족시켜야 한다.
  */
  // 예시
  type Student = {
    study: string;
    score: number;
  };
  type Worker = {
    empId: number;
    doWork: () => void;
  };
  const internWorker = (person: Student & Worker) => {
    console.log('foo', person);
  };
  internWorker({
    study: 'english',
    score: 10,
    empId: 29375641923478,
    doWork: () => {
      console.log('foo');
    }
  });
}
