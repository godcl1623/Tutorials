{
  // 봉급 정보를 가지는 인터페이스 Employee 정의
  interface Employee {
    pay(): void;
  }

  // 1. Employee를 구현한 클래스 1, 고유 함수 workFullTime() 존재
  class FullTimeEmployee implements Employee {
    pay(): void {
      console.log('full time !!');
    }

    workFullTime(): void {
      console.log('do something');
    }
  }

  // 2. Employee를 구현한 클래스 2, 고유 함수 workPartTime() 존재
  class PartTimeEmployee implements Employee {
    pay(): void {
      console.log('part time !!');
    }

    workPartTime(): void {
      console.log('do something');
    }
  }

  // 인터페이스 Employee를 구현한 인스턴스를 받아 pay() 메서드를 실행한 후 해당 인수를 다시 반환
  // 세부적인 타입을 인자로 받은 후 추상적인 타입으로 다시 리턴하므로 바람직하지 않음
  function pay<C extends Employee>(employee: C): C {
    employee.pay();
    return employee;
  }

  // 인스턴스 생성 시점에는 둘 모두 workFullTime() 혹은 workPartTime() 등 고유 메서드 사용 가능
  const josh = new FullTimeEmployee();
  const rick = new PartTimeEmployee();
  // pay() 적용 시점부터는 고유 메서드 사용 불가 -> 반환 타입이 interface Employee이기 때문에 (세부 클래스 정보를 잃어) 명세에 어긋나는 고유 메서드 이용 못함
  const joshAfterPay = pay(josh);
  const rickAfterPay = pay(rick);
}
{
  const obj = {
    name: 'joshua',
    age: 20
  };

  const obj2 = {
    animal: '🐶'
  };

  const getValue = <O, K extends keyof O>(obj: O, key: K): O[K] => {
    return obj[key];
  };

  console.log(getValue(obj, 'name'));
  console.log(getValue(obj, 'age'));
  console.log(getValue(obj2, 'animal'));
}
