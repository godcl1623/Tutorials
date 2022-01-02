type LinkedList<V> = {
  readonly data: V;
  readonly next?: LinkedList<V>;
};

interface StackStructure<V> {
  readonly size: number;
  push(val: V): void;
  pop(): V;
}

class Stack<V> implements StackStructure<V> {
  constructor(private capacity: number) {}

  private _size: number = 0;

  private head?: LinkedList<V>;

  public get size() {
    return this._size;
  }

  public get debug() {
    return this.head;
  }

  push(data: V): void {
    if (this.size === this.capacity) {
      throw new Error('Stack capacity is full !');
    }
    const node: LinkedList<V> = { data, next: this.head };
    this.head = node;
    this._size++;
  }

  pop(): V {
    if (this.head == null) {
      throw new Error('No data in Stack !');
    }
    const node: LinkedList<V> = this.head;
    this.head = node.next;
    this._size--;
    return node.data;
  }
}

const stack = new Stack(10);
const inputs = ['html', 0, 2, ['css'], { key1: 'node', key2: 3 }, 'typescript', 1, 'graphql', [{ key3: 'python' }]];
inputs.forEach(input => stack.push(input));
for (let i = 0; i < inputs.length; i++) {
  console.log(stack.pop());
  console.log('head: ', stack.debug, 'size: ', stack.size);
}
