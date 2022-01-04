{
  // 타입으로 객체를 정의하는 경우
  type PositionType = {
    x: number;
    y: number;
  }

  const obj1: PositionType = {
    x: 1,
    y: 1
  }

  // 인터페이스로 객체를 정의하는 경우
  interface PositionInterface {
    x: number;
    y: number;
  }

  const obj2: PositionInterface = {
    x: 1,
    y: 1
  }

  // 타입, 인터페이스로 클래스 구현 가능
  class Pos1 implements PositionType {
    x: number = 1;
    y: number = 1;
  }

  class Pos2 implements PositionInterface {
    x: number = 1;
    y: number = 1;	
  }

  // 각자 유형에 맞는 확장도 가능
  type ZPositionType = PositionType & {
    z: number;
  }

  interface ZPositionInterface extends PositionInterface {
    z: number;
  }
}
