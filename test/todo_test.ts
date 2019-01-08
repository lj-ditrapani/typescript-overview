import assert from 'assert'
import { instance, mock } from 'ts-mockito'
import { Io, IoImpl } from '../src/io'
import { Item, Todo } from '../src/todo'

describe('Todo', () => {
  describe('add', () => {
    it('it adds an item to the list', () => {
      const ioMock = mock(IoImpl)
      const io: Io = instance(ioMock)
      const todo = new Todo(io)
      assert.deepEqual(todo.list, [])
      todo.add('add wash car')
      assert.deepEqual(todo.list, [new Item('wash car', 'todo')])
      todo.add('add eat lunch')
      assert.deepEqual(todo.list, [
        new Item('wash car', 'todo'),
        new Item('eat lunch', 'todo')
      ])
    })
  })

  describe('done', () => {
    it('it marks an item as done', () => {
      assert(false)
    })
  })

  describe('list', () => {
    it('display the list', () => {
      assert(false)
    })
  })

  describe('help', () => {
    it('display the help text', () => {
      assert(false)
    })
  })
})
