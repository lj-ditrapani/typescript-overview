class BaseList<A> {
  reduce<B>(this: List<A>, zero: B, f: (acc: B, item: A) => B): B {
    let node: List<A> = this
    let acc = zero
    while (true) {
      switch (node.kind) {
        case 'cons':
          acc = f(acc, node.head)
          node = node.tail
          break
        case 'nil':
          return acc
      }
    }
  }

  reverse(this: List<A>): List<A> {
    return this.reduce<List<A>>(nil, (acc, item) => new Cons(item, acc))
  }

  map<B>(this: List<A>, f: (item: A) => B): List<B> {
    return this.reverse().reduce<List<B>>(nil, (acc, item) => new Cons(f(item), acc))
  }

  size(this: List<A>): number {
    return this.reduce(0, (acc, _unused) => acc + 1)
  }

  toString(this: List<A>): string {
    return this.reduce('List( ', (acc, item) => `${acc}${item} `) + ')'
  }
}

class Nil<A> extends BaseList<A> {
  public readonly kind: 'nil' = 'nil'

  readonly isEmpty = (): boolean => true
}

export const nil = new Nil<never>()

export class Cons<A> extends BaseList<A> {
  public readonly kind: 'cons' = 'cons'

  constructor(public readonly head: A, public readonly tail: List<A>) {
    super()
  }

  readonly isEmpty = (): boolean => false
}

export type List<A> = Cons<A> | Nil<A>
