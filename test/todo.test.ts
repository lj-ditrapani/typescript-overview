import { Continue, exit } from '../src/result.js'
import {
  helpCommand,
  listCommand,
  missingArgCommand,
  unexpectedArgCommand,
  unknownCommand,
} from '../src/command.js'
import { ColoredString } from '../src/output.js'
import { Item } from '../src/item.js'
import { todoLogic } from '../src/todo.js'

describe('todo', () => {
  const item1 = () => new Item('wash car', 'todo')
  const item2 = () => new Item('program', 'done')
  const list = () => [item1(), item2()]

  describe('on help command', () => {
    it('returns the help text as output', () => {
      expect(todoLogic([], 'help')).toEqual(helpCommand.process([]))
    })

    it('when provided with an arg, returns the unexpected arg error', () => {
      expect(todoLogic([], 'help 1')).toEqual(unexpectedArgCommand('help').process([]))
    })
  })

  describe('on list command', () => {
    it('when the list is empty, returns a hint as output', () => {
      expect(todoLogic([], 'list')).toEqual(listCommand.process([]))
    })

    it('when the list is not empty, returns the list as output', () => {
      expect(todoLogic(list(), 'list')).toEqual(listCommand.process(list()))
    })

    it('when provided with an arg, returns the unexpected arg error', () => {
      expect(todoLogic([], 'list 1')).toEqual(unexpectedArgCommand('list').process([]))
    })
  })

  describe('on quit command', () => {
    it('returns exit', () => {
      expect(todoLogic([], 'quit')).toEqual(exit)
    })

    it('when provided with an arg, returns the unexpected arg error', () => {
      expect(todoLogic([], 'quit 1')).toEqual(unexpectedArgCommand('quit').process([]))
    })
  })

  describe('on add command', () => {
    it('returns output with new item added', () => {
      const result = new Continue(
        [['1', new ColoredString('green', 'wash car')]],
        [item1()],
      )
      expect(todoLogic([], 'add wash car')).toEqual(result)
    })

    it('when missing the arg, returns the missing arg error', () => {
      expect(todoLogic([], 'add')).toEqual(missingArgCommand('add').process([]))
    })
  })

  describe('on done command', () => {
    it('returns output with target item marked as done', () => {
      const newList: Item[] = [new Item('wash car', 'done')]
      newList.push(item2())
      const output = [
        ['1', new ColoredString('blue', 'wash car'), '(done)'],
        ['2', new ColoredString('blue', 'program'), '(done)'],
      ]
      const result = new Continue(output, newList)
      expect(todoLogic(list(), 'done 1')).toEqual(result)
    })

    it('when index is out of bounds, returns an error', () => {
      const errorMsg = 'Done command must have a valid item index'
      const result = new Continue([[new ColoredString('red', errorMsg)]], [])
      expect(todoLogic([], 'done 1')).toEqual(result)
    })

    it('when index is not a number, returns an error', () => {
      const errorMsg = 'Done command must have a valid item index'
      const result = new Continue([[new ColoredString('red', errorMsg)]], [])
      expect(todoLogic([], 'done cat')).toEqual(result)
    })

    it('when missing the arg, returns the missing arg error', () => {
      expect(todoLogic([], 'done')).toEqual(missingArgCommand('done').process([]))
    })
  })

  describe('on an unknown command', () => {
    it('returns unknown command error', () => {
      expect(todoLogic([], 'unknown')).toEqual(unknownCommand.process([]))
    })
  })
})
