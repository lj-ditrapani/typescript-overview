class NilClass {
  public readonly kind: 'nil' = 'nil'

  readonly isEmpty = (): boolean => true

  readonly reduce = <B>(zero: B, f: (acc: B, item: never) => B): B =>
    reduce(this, zero, f)
}

export const nil = new NilClass()

export class Cons<A> {
  public readonly kind: 'cons' = 'cons'

  constructor(public readonly head: A, public readonly tail: List<A>) {}

  readonly isEmpty = (): boolean => false

  readonly reduce = <B>(zero: B, f: (acc: B, item: A) => B): B => reduce(this, zero, f)
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
