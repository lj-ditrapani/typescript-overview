class NilClass {
  public readonly kind: 'nil' = 'nil'

  readonly isEmpty = (): boolean => true

  readonly reduce = <B>(zero: B, f: (acc: B, item: never) => B): B =>
    reduce(this, zero, f)

  readonly reverse = (): List<never> => this

  readonly map = <B>(_unused: (item: never) => B): List<B> => this

  readonly size = (): number => 0

  readonly toString = (): string => 'List( )'
}

export const nil = new NilClass()

export class Cons<A> {
  public readonly kind: 'cons' = 'cons'

  constructor(public readonly head: A, public readonly tail: List<A>) {}

  readonly isEmpty = (): boolean => false

  readonly reduce = <B>(zero: B, f: (acc: B, item: A) => B): B => reduce(this, zero, f)

  readonly reverse = (): List<A> =>
    this.reduce<List<A>>(nil, (acc, item) => new Cons(item, acc))

  readonly map = <B>(f: (item: A) => B): List<B> =>
    this.reverse().reduce<List<B>>(nil, (acc, item) => new Cons(f(item), acc))

  readonly size = (): number => this.reduce(0, (acc, _unused) => acc + 1)

  readonly toString = (): string => this.reduce('List( ', (acc, item) => `${acc}${item} `)
}

const reduce = <A, B>(list: List<A>, zero: B, f: (acc: B, item: A) => B): B => {
  let node: List<A> = list
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

export type List<A> = Cons<A> | NilClass
