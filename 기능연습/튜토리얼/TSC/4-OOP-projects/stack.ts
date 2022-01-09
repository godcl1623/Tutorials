{
  /*
    1차 시도
    ※ 문제점
      1. 배열 사용하지 말라고 했는데 배열 사용함
        - 원인: 객체로 구현하려 했는데, 객체의 타입을 지정하는 방법을 알지 못해서
        - 힌트: 단일 연결 리스트 구현
      2. 스택 안에 데이터가 저장된 상황을 알 수 없음
        - 예외처리 필요, 사용자가 상황을 확인하고 pop을 더 이상 사용하지 않도록 만들기
        - 힌트: 수정 불가능하고 오직 열람만 가능한 프로퍼티를 interface 수준에서 정의
  */
  interface StackSpec {
    pushItem(data: string): void;
    popItem(): string;
  }

  class StackType implements StackSpec {
    private static index: number = 0;

    public pushItem = (data: string): void => {
      // this.storage[StackType.index] = data;
      this.storage[StackType.index] = data;
      StackType.index += 1;
    };

    public popItem = (): string => {
      // const item: string = this.storage[StackType.index];
      // this.storage[StackType.index] = '';
      // return item;
      const item: string = this.storage[StackType.index - 1];
      this.storage = this.storage.filter(prop => prop !== item);
      StackType.index -= 1;
      return item;
    };

    private storage: string[] = [];
  }
}
{
  /* 2차 시도 */
  type LinkedList = {
    address: number;
    data: string;
    next: LinkedList | null;
  };

  interface IStack {
    readonly size: number;
    push(data: string): void;
    pop(): string;
  }

  class Stack implements IStack {
    public head: LinkedList | null = null;
    private index: number = 0;
    public readonly size: number = this.index;

    public push(data: string): void {
      this.index += 1;
      if (this.head === null) {
        this.head = {
          address: this.index,
          data,
          next: null
        };
      } else {
        this.searchHead(this.head).next = {
          address: this.index,
          data,
          next: null
        };
      }
    }

    public pop(): string {
      if (this.head === null) {
        throw new Error('No data in Stack !');
      } else {
        const currentHead = this.searchHead(this.head);
        const beforeHead = this.searchHead(this.head, this.index - 1);
        const { data } = currentHead;
        beforeHead.next = null;
        this.index -= 1;
        return data;
      }
    }

    private searchHead(arg: LinkedList, idx?: number): LinkedList {
      if (idx === undefined) {
        let result: LinkedList;
        if (arg.next === null) {
          result = arg;
        } else {
          result = this.searchHead(arg.next);
        }
        return result;
      } else {
        let result: LinkedList;
        if (arg.address === idx) {
          result = arg;
        } else {
          result = this.searchHead(arg.next as LinkedList, idx);
        }
        return result;
      }
    }
  }
}
{
  /*
    ※ 정답
    - 내 코드와의 차이
      1. readonly 프로퍼티를 private + getter로 구현
      2. 링크드 리스트 자료형을 구현할 때 address 없음 + 프로퍼티 읽기 전용으로 설정
      3. Union 타입 설정하는 대신 Optional Param 이용
      4. head 설정, 검색 방식에 차이
        나: 재귀함수로 next의 값이 null이 되는 지점에서 새로운 노드 생성 / address가 index - 1과 동일한 지점에서 next 삭제 -> 나중에 들어온 node를 next의 값으로 만드는 방식을 취했으므로
        정답: next의 값을 this.head로 설정 / this.head의 값을 node.next로 설정 -> 먼저 들어온 node를 next의 값으로 만드는 방식을 취했으므로
      5. capacity 설정
  */
  interface IStack {
    push(value: string): void;
    pop(): string;
    readonly size: number;
  }

  type StackNode = {
    readonly value: string;
    readonly next?: StackNode;
  };

  class Stack implements IStack {
    constructor(private capacity: number) {}
    private _size: number = 0;
    private head?: StackNode;
    public get size() {
      return this._size;
    }
    push(value: string) {
      if (this.size === this.capacity) {
        throw new Error('Stack is full !');
      }
      const node: StackNode = { value, next: this.head };
      this.head = node;
      this._size++;
    }
    pop(): string {
      if(this.head == null) {
        throw new Error('Stack is empty !');
      }
      const node = this.head;
      this.head = node.next;
      this._size--;
      return node.value;
    }
  }
}
