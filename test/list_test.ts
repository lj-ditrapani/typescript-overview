import assert from 'assert'
import { Cons, List, Nil } from '../src/list'

const checkCons = (list: List<number>, n: number): List<number> => {
  switch (list.kind) {
    case 'cons':
      assert.strictEqual(list.head, n)
      return list.tail
    case 'nil':
      throw new Error('Expected Cons, found Nil')
    default:
      const exhaustiveCheck: never = list
      return exhaustiveCheck
  }
}

const checkNil = (list: List<number>): void => {
  switch (list.kind) {
    case 'cons':
      throw new Error('Expected Nil, found Cons')
    case 'nil':
      assert.strictEqual(list, Nil)
      break
    default:
      const exhaustiveCheck: never = list
      return exhaustiveCheck
  }
}

const checkList = (list: List<number>): void => {
  const list2 = checkCons(list, 1)
  const list3 = checkCons(list2, 2)
  checkNil(list3)
}

describe('List', () => {
  it('is a list', () => {
    const list: List<number> = new Cons(1, new Cons(2, Nil))
    checkList(list)
  })
})
