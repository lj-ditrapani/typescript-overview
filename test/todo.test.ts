import { Item, Todo } from '../src/todo'
import { PrintError, PrintList, Result, exit, noop, printHelp } from '../src/result'

const resultIsList = (result: Result, items: Item[]): void => {
  expect(result).toStrictEqual(new PrintList(items))
}

const resultIsError = (result: Result, err: string): void => {
  expect(result).toStrictEqual(new PrintError(err))
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
        new Item('eat lunch', 'todo'),
      ])
    })

    it('returns noop', () => {
      const todo = new Todo()
      expect(todo.dispatch('add wash car')).toBe(noop)
    })

    describe('when there is extra whitespace around the description', () => {
      it('trims the description', () => {
        const todo = new Todo()
        expect(todo.dispatch('add   wash car  ')).toBe(noop)
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
      expect(todo.dispatch('done 1')).toBe(noop)
      resultIsList(todo.dispatch('list'), [new Item('wash car', 'done')])
    })

    const errorMsg =
      'Done command must have space after done with ' +
      'a valid index that follows.\nExample: done 3'

    describe('when the index has extra white space', () => {
      it('still parses correctly', () => {
        const todo = new Todo()
        todo.dispatch('add wash car')
        expect(todo.dispatch('done   \t1\t  ')).toBe(noop)
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
        new Item('eat lunch', 'done'),
      ])
    })
  })

  describe('help command', () => {
    it('displays the help text', () => {
      const todo = new Todo()
      const result = todo.dispatch('help')
      expect(result).toBe(printHelp)
    })
  })

  describe('quit command', () => {
    it('returns exit', () => {
      const todo = new Todo()
      const result = todo.dispatch('quit')
      expect(result).toBe(exit)
    })
  })

  describe('unknown command', () => {
    it('returns a PrintError', () => {
      const todo = new Todo()
      const result = todo.dispatch('cure cancer')
      expect(result).toStrictEqual(
        new PrintError(
          'I do not understand your command.  Enter help to display available commands.',
        ),
      )
    })
  })
})

describe('Item.toString', () => {
  describe('when the item is todo', () => {
    it('returns the indexed line with green description text', () => {
      const item = new Item('wash car', 'todo')
      const green = jest.fn()
      const grey = jest.fn()
      green.mockReturnValueOnce('[green desc]')
      const output = item.toString(0, green, grey)
      expect(output).toBe('1 [green desc]')
      expect(green).toHaveBeenCalledWith('wash car')
      expect(grey).not.toHaveBeenCalled()
    })
  })

  describe('when the item is done', () => {
    it('returns the indexed line with grey description text and (done) suffix', () => {
      const item = new Item('bake bread', 'done')
      const green = jest.fn()
      const grey = jest.fn()
      grey.mockReturnValueOnce('[grey desc]')
      const output = item.toString(3, green, grey)
      expect(output).toBe('4 [grey desc] (done)')
      expect(green).not.toHaveBeenCalled()
      expect(grey).toHaveBeenCalledWith('bake bread')
    })
  })
})
