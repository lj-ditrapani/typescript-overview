export class NilClass {}

export const nil = new NilClass()

export class Cons<A> {
  constructor(public readonly head: A, public readonly tail: List<A>) {}
}

export type List<A> = Cons<A> | NilClass
