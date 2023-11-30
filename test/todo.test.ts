import { describe, it, expect } from 'vitest'
import {
  doneIndexError,
  emptyListHint,
  exit,
  help,
  ListResult,
  missingArg,
  unexpectedArg,
  unknown,
} from '../src/result.js'
import { Item } from '../src/item.js'
import { Todo } from '../src/todo.js'

describe('todo', () => {
  const item1 = () => new Item('wash car', 'todo')
  const item2 = () => new Item('program', 'done')
  const list = () => [item1(), item2()]
  const seededTodo = () => {
    const todo = new Todo()
    todo.dispatch('add wash car')
    todo.dispatch('add program')
    todo.dispatch('done 2')
    return todo
  }

  describe('command parsing', () => {
    it('trims leading and trailing white space around the command and arg', () => {
      expect(new Todo().dispatch('\t  help\t \t')).toEqual(help)
      expect(new Todo().dispatch(' \t add\t\twash car  \t')).toEqual(
        new ListResult([item1()]),
      )
      const item = new Item('wash\t\tcar', 'todo')
      expect(new Todo().dispatch('\t\tadd\t\twash\t\tcar\t\t')).toEqual(
        new ListResult([item]),
      )
    })
  })

  describe('on help command', () => {
    it('returns the help text as output', () => {
      expect(new Todo().dispatch('help')).toEqual(help)
    })

    it('when provided with an arg, returns the unexpected arg error', () => {
      expect(new Todo().dispatch('help 1')).toEqual(unexpectedArg('help'))
    })
  })

  describe('on list command', () => {
    it('when the list is empty, returns a hint as output', () => {
      expect(new Todo().dispatch('list')).toEqual(emptyListHint)
    })

    it('when the list is not empty, returns the list as output', () => {
      expect(seededTodo().dispatch('list')).toEqual(new ListResult(list()))
    })

    it('when provided with an arg, returns the unexpected arg error', () => {
      expect(new Todo().dispatch('list 1')).toEqual(unexpectedArg('list'))
    })
  })

  describe('on quit command', () => {
    it('returns exit', () => {
      expect(new Todo().dispatch('quit')).toEqual(exit)
    })

    it('when provided with an arg, returns the unexpected arg error', () => {
      expect(new Todo().dispatch('quit 1')).toEqual(unexpectedArg('quit'))
    })
  })

  describe('on add command', () => {
    it('returns output with new item added', () => {
      expect(new Todo().dispatch('add wash car')).toEqual(new ListResult([item1()]))
      const newList = list()
      newList.push(item1())
      expect(seededTodo().dispatch('add wash car')).toEqual(new ListResult(newList))
    })

    it('when missing the arg, returns the missing arg error', () => {
      expect(new Todo().dispatch('add')).toEqual(missingArg('add'))
    })
  })

  describe('on done command', () => {
    it('returns output with target item marked as done', () => {
      const newList: Item[] = [new Item('wash car', 'done')]
      newList.push(item2())
      const result = new ListResult(newList)
      expect(seededTodo().dispatch('done 1')).toEqual(result)
    })

    it('when index is out of bounds, returns an error', () => {
      const todo = seededTodo()
      expect(todo.dispatch('done 0')).toEqual(doneIndexError)
      expect(todo.dispatch('done 3')).toEqual(doneIndexError)
    })

    it('when index is not a number, returns an error', () => {
      expect(seededTodo().dispatch('done cat')).toEqual(doneIndexError)
    })

    it('when missing the arg, returns the missing arg error', () => {
      expect(new Todo().dispatch('done')).toEqual(missingArg('done'))
    })
  })

  describe('on an unknown command', () => {
    it('with no arg, returns unknown command error', () => {
      expect(new Todo().dispatch('unknown')).toEqual(unknown)
    })

    it('with an arg, returns unknown command error', () => {
      expect(new Todo().dispatch('unknown with arg')).toEqual(unknown)
    })

    describe('when there is no input, or the input is only whitespace', () => {
      it('returns an unknown command error', () => {
        const todo = new Todo()
        expect(todo.dispatch('')).toBe(unknown)
        expect(todo.dispatch('\t\t \t')).toBe(unknown)
      })
    })
  })

  describe('when an error happens', () => {
    it('the list is not modified', () => {
      const todo = seededTodo()

      // These commands all generate errors
      todo.dispatch('unknown')
      todo.dispatch('add')
      todo.dispatch('done')
      todo.dispatch('list 1')
      todo.dispatch('help 1')
      todo.dispatch('done cat')
      todo.dispatch('done 0')
      todo.dispatch('done 3')

      // But list is unchanged
      expect(todo.dispatch('list')).toEqual(new ListResult(list()))
    })
  })
})
