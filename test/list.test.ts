import { Cons, List, nil } from '../src/list'

const checkCons = (list: List<number>, n: number): List<number> => {
  switch (list.kind) {
    case 'cons':
      expect(list.head).toBe(n)
      return list.tail
    case 'nil':
      throw new Error('Expected Cons, found nil')
  }
}

const checkNil = (list: List<number>): null => {
  switch (list.kind) {
    case 'cons':
      throw new Error('Expected nil, found Cons')
    case 'nil':
      expect(list).toBe(nil)
      return null
  }
}

const checkList = (list: List<number>): void => {
  const list2 = checkCons(list, 1)
  const list3 = checkCons(list2, 2)
  checkNil(list3)
}

describe('List', () => {
  it('is a list', () => {
    // This test only exists to show how to match on an ADT
    const list: List<number> = new Cons(1, new Cons(2, nil))

    // This is not a good way to assert the structure of the list,
    // but it illustrates exhaustive ADT matching
    checkList(list)

    // These assertions do the same as above in a much safer way
    expect(list).toStrictEqual(new Cons(1, new Cons(2, nil)))
    expect(list).not.toStrictEqual(new Cons(1, new Cons(3, nil)))
    expect(list).not.toStrictEqual(new Cons(1, nil))
  })
})
