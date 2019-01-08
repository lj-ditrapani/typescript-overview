import assert from 'assert'
import { Noop, PrintError, PrintHelp } from '../src/output'
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
    it('it marks an item as done and returns Result(Noop, continue)', () => {
      const todo = new Todo()
      todo.dispatch('add wash car')
      const doneResult = todo.dispatch('done 1')
      assert.deepStrictEqual(doneResult, new Result(Noop, 'continue'))
      const listResult = todo.dispatch('list')
      assert.strictEqual(listResult.result, 'continue')
      const printList = listResult.output
      assert.strictEqual(printList.kind, 'list')
      if (printList.kind === 'list') {
        const list = printList.list
        assert.deepStrictEqual(list, [new Item('wash car', 'done')])
      }
    })
  })

  describe('list command', () => {
    it('display the list', () => {
      const todo = new Todo()
      todo.dispatch('add wash car')
      todo.dispatch('add eat lunch')
      todo.dispatch('done 2')
      const result = todo.dispatch('list')
      assert.strictEqual(result.result, 'continue')
      const printList = result.output
      assert.strictEqual(printList.kind, 'list')
      if (printList.kind === 'list') {
        const list = printList.list
        assert.deepStrictEqual(list, [
          new Item('wash car', 'todo'),
          new Item('eat lunch', 'done')
        ])
      }
    })
  })

  describe('help command', () => {
    it('display the help text', () => {
      const todo = new Todo()
      const result = todo.dispatch('help')
      assert.deepStrictEqual(result, new Result(PrintHelp, 'continue'))
    })
  })

  describe('quit command', () => {
    it('returns Result(noop, exit)', () => {
      const todo = new Todo()
      const result = todo.dispatch('quit')
      assert.deepStrictEqual(result, new Result(Noop, 'exit'))
    })
  })

  describe('unknown command', () => {
    it('returns Result(error, continue)', () => {
      const todo = new Todo()
      const result = todo.dispatch('cure cancer')
      assert.deepStrictEqual(
        result,
        new Result(
          new PrintError(
            'I do not understand your command.  Enter help to display available commands.'
          ),
          'continue'
        )
      )
    })
  })
})
