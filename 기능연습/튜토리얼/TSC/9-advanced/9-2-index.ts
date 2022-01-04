{
  /**
   * 객체에서 프로퍼티의 값을 호출하는 방법
      => 2가지 방법 존재
      1. 객체.키
      2. 객체['키 명칭'] -> 이하 '인덱스 방식'
   */
  const obj = {
    name: 'joshua'
  };

  // 1. 객체.키
  console.log(obj.name); // joshua

  // 2. 인덱스 방식
  console.log(obj['name']); // joshua

  /**
   * 객체와 같은 방식으로 타입 또한 할당이 가능함
   */

  type Animal = {
    name: string;
    age: number;
    gender: 'male' | 'female';
  };

  // 인덱스 방식으로 타입 할당
  type Name = Animal['name']; // type Name = string;
  const name: Name = 'yoshua'; // name: string = 'yoshua';

  type Gender = Animal['gender']; // type Gender = 'male' | 'female'
  const gender: Gender = 'male';

  type Keys = keyof Animal; // Animal 타입에 존재하는 모든 key를 Union 타입 형태로 추가 => 'name' | 'age' | 'gender'
  const key: Keys = 'name';

  type Person = {
    name: string;
    gender: Animal['gender']; // 다른 타입에서도 호출 가능
  };

  const person: Person = {
    name: 'rick',
    gender: 'male'
  };
}
