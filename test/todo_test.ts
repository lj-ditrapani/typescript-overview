import assert from 'assert'
import { exit, noop, PrintError, printHelp, Result } from '../src/result'
import { Item, Todo } from '../src/todo'

const resultIsList = (result: Result, items: Item[]): void => {
  assert.strictEqual(result.kind, 'list')
  if (result.kind === 'list') {
    const list = result.list
    assert.deepStrictEqual(list, items)
  }
}

const resultIsError = (result: Result, err: string): void => {
  assert.deepStrictEqual(result, new PrintError(err))
}

describe('Todo.dispatch', () => {
  describe('add command', () => {
    it('adds an item to the list', () => {
      const todo = new Todo()
      resultIsList(todo.dispatch('list'), [])
      todo.dispatch('add wash car')
      resultIsList(todo.dispatch('list'), [new Item('wash car', 'todo')])
      todo.dispatch('add eat lunch')
      resultIsList(todo.dispatch('list'), [
        new Item('wash car', 'todo'),
        new Item('eat lunch', 'todo')
      ])
    })

    it('returns noop', () => {
      const todo = new Todo()
      const result = todo.dispatch('add wash car')
      assert.deepStrictEqual(result, noop)
    })

    describe('when there is extra whitespace around the description', () => {
      it('trims the description', () => {
        const todo = new Todo()
        const result = todo.dispatch('add   wash car  ')
        assert.deepStrictEqual(result, noop)
        resultIsList(todo.dispatch('list'), [new Item('wash car', 'todo')])
      })
    })

    const errorMsg =
      'Add command must have space after add with ' +
      'a description that follows.\nExample: add buy hot dogs.'

    describe('when there is no description', () => {
      it('does not add to list and returns a PrintError', () => {
        const todo = new Todo()
        resultIsError(todo.dispatch('add'), errorMsg)
        resultIsList(todo.dispatch('list'), [])
      })
    })

    describe('when the description is whitespace only', () => {
      it('does not add to list and returns a PrintError', () => {
        const todo = new Todo()
        resultIsError(todo.dispatch('add   '), errorMsg)
        resultIsList(todo.dispatch('list'), [])
      })
    })
  })

  describe('done command', () => {
    it('it marks an item as done and returns noop', () => {
      const todo = new Todo()
      todo.dispatch('add wash car')
      const doneResult = todo.dispatch('done 1')
      assert.deepStrictEqual(doneResult, noop)
      resultIsList(todo.dispatch('list'), [new Item('wash car', 'done')])
    })

    const errorMsg =
      'Done command must have space after done with ' +
      'a valid index that follows.\nExample: done 3'

    describe('when the index has extra white space', () => {
      it('still parses correctly', () => {
        const todo = new Todo()
        todo.dispatch('add wash car')
        const doneResult = todo.dispatch('done   \t1\t  ')
        assert.deepStrictEqual(doneResult, noop)
        resultIsList(todo.dispatch('list'), [new Item('wash car', 'done')])
      })
    })

    describe('when the index is out of bounds', () => {
      it('returns a PrintError', () => {
        const todo = new Todo()
        const result = todo.dispatch('done 1')
        resultIsError(result, errorMsg)
      })
    })

    describe('when the index is zero or negative', () => {
      it('returns a PrintError', () => {
        const todo = new Todo()
        todo.dispatch('add wash car')
        const result1 = todo.dispatch('done 0')
        resultIsError(result1, errorMsg)
        const result2 = todo.dispatch('done -1')
        resultIsError(result2, errorMsg)
      })
    })

    describe('when the index is NaN', () => {
      it('returns a PrintError', () => {
        const todo = new Todo()
        const result = todo.dispatch('done XIV')
        resultIsError(result, errorMsg)
      })
    })

    describe('when the index is missing', () => {
      it('returns a PrintError', () => {
        const todo = new Todo()
        const result = todo.dispatch('done')
        resultIsError(result, errorMsg)
      })
    })

    describe('when there is only whitespace after the done command', () => {
      it('returns a PrintError', () => {
        const todo = new Todo()
        const result = todo.dispatch('done  \t ')
        resultIsError(result, errorMsg)
      })
    })
  })

  describe('list command', () => {
    it('displays the list', () => {
      const todo = new Todo()
      todo.dispatch('add wash car')
      todo.dispatch('add eat lunch')
      todo.dispatch('done 2')
      resultIsList(todo.dispatch('list'), [
        new Item('wash car', 'todo'),
        new Item('eat lunch', 'done')
      ])
    })
  })

  describe('help command', () => {
    it('displays the help text', () => {
      const todo = new Todo()
      const result = todo.dispatch('help')
      assert.deepStrictEqual(result, printHelp)
    })
  })

  describe('quit command', () => {
    it('returns exit', () => {
      const todo = new Todo()
      const result = todo.dispatch('quit')
      assert.deepStrictEqual(result, exit)
    })
  })

  describe('unknown command', () => {
    it('returns a PrintError', () => {
      const todo = new Todo()
      const result = todo.dispatch('cure cancer')
      assert.deepStrictEqual(
        result,
        new PrintError(
          'I do not understand your command.  Enter help to display available commands.'
        )
      )
    })
  })
})
