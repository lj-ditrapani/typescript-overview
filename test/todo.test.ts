import { helpCommand, listCommand } from '../src/command.js'
import { Item } from '../src/item.js'
import { exit } from '../src/result.js'
import { todoLogic } from '../src/todo.js'

describe('todo', () => {
  const list = [new Item('was car', 'todo'), new Item('program', 'done')]

  describe('on help command', () => {
    it('returns the help text as output', () => {
      expect(todoLogic([], 'help')).toEqual(helpCommand.process([]))
    })
  })

  describe('on list command', () => {
    it('when the list is empty, returns a hint as output', () => {
      expect(todoLogic([], 'list')).toEqual(listCommand.process([]))
    })

    it('when the list is not empty, returns the list as output', () => {
      expect(todoLogic(list, 'list')).toEqual(listCommand.process(list))
    })
  })

  describe('on quit command', () => {
    it('returns exit', () => {
      expect(todoLogic([], 'quit')).toEqual(exit)
    })
  })
})
