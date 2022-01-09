{
  /**
    Type Alias: 타입스크립트가 강력한 이유 - 새로운 타입을 개발자가 정의해서 사용할 수 있음

    ##### 만드는 방법 #####
    type 식별자(첫글자 대문자) = (설정할 타입);
   */
  type Text = string;
  const namea: string = 'foo'; // 기본적인 타입을 이용하는 경우
  const nameb: Text = 'bar'; // type alias를 이용하는 경우
  /**
    Type Alias는 단순히 원시 타입만 지정할 수 있는게 아니라, 객체 타입 또한 설정할 수 있음

    ##### 객체 타입의 설정 방법 #####
    type 식별자 = {
      (프로퍼티 a): (프로퍼티 a의 타입);
      (프로퍼티 b): (프로퍼티 b의 타입);
      ...
    }
    => 실제 객체와는 다르게 줄 구분을 콤마가 아니라 세미콜론으로 함

    ### 주의 사항 ###
      - Type Alias로 정의한 객체 타입은 새로운 객체를 선언할 때 사용함 -> 원시 타입에는 설정 불가
      - Type Alias로 설정한 객체 타입을 이용할 때, 객체 타입에서 지정한 프로퍼티명을 그대로 사용해야 함 -> 위를 예로 들면 '프로퍼티 a', '프로퍼티 b'라고 그대로 설정해야 함
   */
  type Student = {
    name: string;
    age: number;
  };
  const namec: Student = 'doh'; // 이렇게 작성할 경우 "'string' 형식은 'Student' 형식에 할당할 수 없습니다." 라는 오류가 출력됨
  const studenta: Student = {
    grade: 'a',
    score: 92
  }; // '{ grade: string; score: number; }' 형식은 'Student' 형식에 할당할 수 없습니다. \n 개체 리터럴은 알려진 속성만 지정할 수 있으며 'Student' 형식에 'grade'이(가) 없습니다.
  const studentb: Student = {
    age: 29,
    name: 'joshua'
  }; // 올바른 형태. 순서는 상관 없음

  /**
    String Literal Types: 타입을 문자열 형태로도 설정할 수 있음
      => 이 유형의 타입이 설정될 경우, type alias로 설정된 문자열 외의 값을 할당할 수 없음

    ### 사용 방법 ###
    type 식별자 = '문자열';
   */

  type foo = 'bar';
  const delph: foo = 5281; // '5281' 형식은 '"bar"' 형식에 할당할 수 없습니다.
  const godcl: foo = 'bar'; // 올바른 형태
}
