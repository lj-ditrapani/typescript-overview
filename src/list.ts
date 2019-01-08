class NilClass {
  public readonly kind: 'nil' = 'nil'
}

export const Nil = new NilClass()

export class Cons<A> {
  public readonly kind: 'cons' = 'cons'

  constructor(public readonly head: A, public readonly tail: List<A>) {}
}

export type List<A> = Cons<A> | NilClass
