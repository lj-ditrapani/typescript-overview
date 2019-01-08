import assert from 'assert'
import { Noop } from '../src/output'
import { Item, Result, Todo } from '../src/todo'

describe('Todo.dispatch', () => {
  describe('add command', () => {
    it('it adds an item to the list', () => {
      const todo = new Todo()
      assert.deepEqual(todo.list, [])
      todo.dispatch('add wash car')
      assert.deepEqual(todo.list, [new Item('wash car', 'todo')])
      todo.dispatch('add eat lunch')
      assert.deepEqual(todo.list, [
        new Item('wash car', 'todo'),
        new Item('eat lunch', 'todo')
      ])
    })

    it('returns Result(Noop, continue)', () => {
      const todo = new Todo()
      const result = todo.dispatch('add wash car')
      assert.deepStrictEqual(result, new Result(Noop, 'continue'))
    })
  })

  describe('done command', () => {
    it('it marks an item as done', () => {
      const todo = new Todo()
      todo.dispatch('add wash car')
      todo.dispatch('done 1')
      todo.dispatch('list')
    })
  })

  describe('list command', () => {
    it('display the list', () => {
      assert(false)
    })
  })

  describe('help command', () => {
    it('display the help text', () => {
      assert(false)
    })
  })

  describe('quit command', () => {
    it('returns Result(noop, exit)', () => {
      const todo = new Todo()
      const result = todo.dispatch('quit')
      assert.deepStrictEqual(result, new Result(Noop, 'exit'))
    })
  })
})
