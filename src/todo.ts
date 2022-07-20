import {
  AddCommand,
  Command,
  DoneCommand,
  helpCommand,
  listCommand,
  missingArgCommand,
  quitCommand,
  unexpectedArgCommand,
  unknownCommand,
} from './command.js'
import type { Item } from './item.js'
import type { Result } from './result.js'

export const todo = (items: Item[], input: string): Result => parse(input).process(items)

const parse = (input: string): Command => {
  const trimmed = input.trim()
  const index = trimmed.search(/\s/)
  const [first, second] =
    index === -1
      ? [trimmed]
      : [trimmed.slice(0, index).trim(), trimmed.slice(index, input.length).trim()]
  if (second === undefined) {
    switch (first) {
      case 'help':
        return helpCommand
      case 'list':
        return listCommand
      case 'quit':
        return quitCommand
      case 'add':
      case 'done':
        return missingArgCommand(first)
      default:
        return unknownCommand
    }
  } else {
    switch (first) {
      case 'add':
        return new AddCommand(second)
      case 'done':
        return new DoneCommand(second)
      case 'help':
      case 'list':
      case 'quit':
        return unexpectedArgCommand(first)
      default:
        return unknownCommand
    }
  }
}
