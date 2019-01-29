import assert from 'assert'
import { Cons, List, nil, NilClass } from '../src/list'

const checkCons = (list: List<number>, n: number): List<number> => {
  if (list instanceof Cons) {
    assert.strictEqual(list.head, n)
    return list.tail
  } else if (list instanceof NilClass) {
    throw new Error('Expected Cons, found nil')
  } else {
    const exhaustiveCheck: never = list
    return exhaustiveCheck
  }
}

const checkNil = (list: List<number>): void => {
  if (list instanceof Cons) {
    throw new Error('Expected nil, found Cons')
  } else if (list instanceof NilClass) {
    assert.strictEqual(list, nil)
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
    const list: List<number> = new Cons(1, new Cons(2, nil))
    checkList(list)
  })
})
