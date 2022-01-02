type LinkedList = {
  data: string;
  next?: LinkedList;
};

interface StackStructure {
  readonly size: number;
  push(val: string): void;
  pop(): string;
}

class Stack implements StackStructure {
  constructor(private capacity: number) {}

  private _size: number = 0;

  private head?: LinkedList;

  public get size() {
    return this._size;
  }

  public get debug() {
    return this.head;
  }

  push(data: string): void {
    if (this.size === this.capacity) {
      throw new Error('Stack capacity is full !');
    }
    const node = { data, next: this.head };
    this.head = node;
    this._size++;
  }

  pop(): string {
    if (this.head == null) {
      throw new Error('No data in Stack !');
    }
    const node = this.head;
    this.head = node.next;
    this._size--;
    return node.data;
  }
}

const stack = new Stack(10);
const inputs = ['html', 'css', 'javascript', 'react', 'node', 'express', 'typescript', 'mysql', 'graphql', 'python'];
inputs.forEach(input => stack.push(input));
for (let i = 0; i < inputs.length; i++) {
  console.log(stack.pop());
  console.log('head: ', stack.debug, 'size: ', stack.size);
}
