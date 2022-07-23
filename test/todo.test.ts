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
    it('returns unknown command error', () => {
      expect(new Todo().dispatch('unknown')).toEqual(unknown)
    })
  })
})
