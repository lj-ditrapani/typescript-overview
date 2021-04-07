import assert from 'assert'
import { Cons, List, nil } from '../src/list'

const checkCons = (list: List<number>, n: number): List<number> => {
  switch (list.kind) {
    case 'cons':
      assert.strictEqual(list.head, n)
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
      assert.strictEqual(list, nil)
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
    const list: List<number> = new Cons(1, new Cons(2, nil))
    checkList(list)
  })
})
