import assert from 'assert'
import { Cons, List, Nil, NilClass } from '../src/list'

const checkCons = (list: List<number>, n: number): List<number> => {
  if (list instanceof Cons) {
    assert.strictEqual(list.head, n)
    return list.tail
  } else if (list instanceof NilClass) {
    throw new Error('Expected Cons, found Nil')
  } else {
    const exhaustiveCheck: never = list
    return exhaustiveCheck
  }
}

const checkNil = (list: List<number>): void => {
  if (list instanceof Cons) {
    throw new Error('Expected Nil, found Cons')
  } else if (list instanceof NilClass) {
    assert.strictEqual(list, Nil)
  } else {
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
