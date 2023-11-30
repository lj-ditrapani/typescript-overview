const _reduce = <A, B>(list: List<A>, zero: B, f: (acc: B, item: A) => B): B => {
  let node: List<A> = list
  let acc = zero
  while (node.kind !== 'nil') {
    acc = f(acc, node.head)
    node = node.tail
  }
  return acc
}
class BaseList<A> {
  reduce<B>(this: List<A>, zero: B, f: (acc: B, item: A) => B): B {
    return _reduce(this, zero, f)
  }

  reverse(this: List<A>): List<A> {
    return this.reduce<List<A>>(nil, (acc, item) => new Cons(item, acc))
  }

  map<B>(this: List<A>, f: (item: A) => B): List<B> {
    return this.reverse().reduce<List<B>>(nil, (acc, item) => new Cons(f(item), acc))
  }

  flatMap<B>(this: List<A>, f: (item: A) => List<B>): List<B> {
    return this.map(f)
      .reverse()
      .reduce<List<B>>(nil, (acc, list) =>
        list.reverse().reduce(acc, (acc2, item) => new Cons(item, acc2)),
      )
  }

  filter(this: List<A>, f: (item: A) => boolean): List<A> {
    return this.reverse().reduce<List<A>>(nil, (acc, item) =>
      f(item) ? new Cons(item, acc) : acc,
    )
  }

  size(this: List<A>): number {
    return this.reduce(0, (acc, _unused) => acc + 1)
  }

  toString(this: List<A>): string {
    return this.reduce('List( ', (acc, item) => `${acc}${item} `) + ')'
  }
}

class Nil<A> extends BaseList<A> {
  public readonly kind: 'nil' = 'nil' as const

  isEmpty(): boolean {
    return true
  }
}

export const nil = new Nil<never>()

export class Cons<A> extends BaseList<A> {
  public readonly kind: 'cons' = 'cons' as const

  constructor(
    public readonly head: A,
    public readonly tail: List<A>,
  ) {
    super()
  }

  isEmpty(): boolean {
    return false
  }
}

export type List<A> = Cons<A> | Nil<A>
export const mkList = <A>(...array: A[]): List<A> =>
  array.reduce<List<A>>((list, item) => new Cons(item, list), nil).reverse()
