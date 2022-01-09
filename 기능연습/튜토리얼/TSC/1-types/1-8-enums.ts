{
  /*
    ### Enum ###
    서로 관련이 있는 상수를 모아놓은 타입을 말함
  */
  // JS로 Enum과 비슷한 효과를 내려는 경우
  const DAYS = Object.freeze({ MONDAY: 0, TUEESDAY: 1, WEDNESDAY: 2 });
  console.log(DAYS.MONDAY);
  /*
    TS로 Enum을 선언하는 방법
    => enum 식별자 { 프로퍼티 = 값, ... }; - 식별자, 중괄호 사이에 = 안붙임, type과는 다르게 프로퍼티 구분을 ,로 수행
    값을 할당하지 않은 경우: 자동으로 첫 번째 프로퍼티부터 숫자 0부터 할당, 이후 프로퍼티는 증가한 값 할당
    숫자를 할당한 경우: 앞 프로퍼티에 어떤 숫자가 할당되어있던 상관 없이 해당 프로퍼티부터 다시 증가한 값이 할당됨.
      ex) Monday에 자동으로 0이 붙은 상태로 Wednesday에 0을 따로 할당할 경우, Tuesday = 1, Thursday = 1, Friday = 2, ...
    문자를 할당한 경우: 문자를 최초로 할당한 위치의 최소한 바로 다음 프로퍼티까진 별도의 값 할당이 필요하다.
    그렇지 않을 경우 [열거형 멤버에는 이니셜라이저가 있어야 합니다. ts(1061)] 오류 메세지가 출력된다.
  */
  type dummy = 'foo';
  enum DaysOfWeek {
    Monday,
    Tuesday,
    Wednesday = 0,
    Thursday,
    Friday,
    Saturday = 'hair_cut',
    Sunday = 5
  }
  console.log(DaysOfWeek);
  let foo: DaysOfWeek = DaysOfWeek.Monday;
  console.log('if assign a property of the enum', foo);
  foo = 983;
  console.log('if assign a number not related to the enum', foo);
  /*
    위와 같이 enum DaysOfWeek 타입의 변수에 잘 쳐줘도 DaysOfWeek와 아무 상관 없는 number 타입 숫자를 할당할 경우 오류가 발생하지 않음 -> 타입 보장이 안 되기 때문에 일반적으로 사용이 권장되지 않음

    아래와 같이 일반적인 경우에는 enum의 역할을 union이 대신 수행 가능함
  */
  type Days = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

  let bar: Days = 'Monday'; // 할당 시점부터 할당 가능한 값들이 자동 완성으로 제시됨
  bar = 3; // Days와 전혀 상관 없는 값을 할당할 경우 ['3' 형식은 'Days' 형식에 할당할 수 없습니다. ts(2322)] 출력

  // enum의 의의는 enum 타입이 존재하는 다른 언어로 만들어진 모바일 앱과 JSON으로 통신을 할 때 union으로 인해 오류가 발생하지 않도록 하기 위함임
}
