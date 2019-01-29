export class NilClass {}

export const Nil = new NilClass()

export class Cons<A> {
  constructor(public readonly head: A, public readonly tail: List<A>) {}
}

export type List<A> = Cons<A> | NilClass
