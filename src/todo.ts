import { ColoredString, Line, Output } from './output.js'
import {
  AddCommand,
  Command,
  DoneCommand,
  Result,
  helpCommand,
  listCommand,
  quitCommand,
  unknownCommand,
} from './command.js'

export class Item {
  constructor(public description: string, public state: 'todo' | 'done') {}

  toLine(index: number): Line {
    return this.state === 'todo'
      ? [`${index + 1}`, new ColoredString('green', this.description)]
      : [`${index + 1}`, new ColoredString('blue', this.description), '(done)']
  }
}

export const toOutput = (items: Item[]): Output =>
  items.map((item, index) => item.toLine(index))

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
      default:
        return unknownCommand
    }
  } else {
    switch (first) {
      case 'add':
        return new AddCommand(second)
      case 'done':
        return new DoneCommand(second)
      default:
        return unknownCommand
    }
  }
}
