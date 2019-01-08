import assert from 'assert'
import { Cons, List, Nil } from '../src/list'

const checkList = (list: List<number>): void => {
  assert.strictEqual(list.kind, 'cons')
  if (list.kind === 'cons') {
    assert.strictEqual(list.head, 1)
    assert.strictEqual(list.tail.kind, 'cons')
    if (list.tail.kind === 'cons') {
      assert.strictEqual(list.tail.head, 2)
      assert.strictEqual(list.tail.tail.kind, 'nil')
      if (list.tail.tail.kind === 'nil') {
        assert.strictEqual(list.tail.tail, Nil)
      }
    }
  }
}

describe('List', () => {
  it('is a list', () => {
    const list: List<number> = new Cons(1, new Cons(2, Nil))
    checkList(list)
  })
})
