import { ColoredString, Output } from './output.js'
import { Continue, Result, exit } from './result.js'
import { Item, toOutput } from './item.js'

const error = (text: string): Output => new ColoredString('red', text).asOutput()

export interface Command {
  process(items: Item[]): Result
}

export const helpCommand: Command = (() => {
  const output: Output = new ColoredString(
    'yellow',
    `
      Available commands:
      help                              Displays this help
      list                              Display the todo list
      add <todo item description>       Adds the item to the todo list
      done <todo item number>           Marks the item as done
      quit                              Exit the program`,
  ).asOutput()
  return {
    process(items: Item[]): Result {
      return new Continue(output, items)
    },
  }
})()

export const listCommand: Command = (() => {
  const emptyListHint: Output = new ColoredString(
    'yellow',
    'List is empty.  Try adding some items',
  ).asOutput()
  return {
    process(items: Item[]): Result {
      const output = items.length == 0 ? emptyListHint : toOutput(items)
      return new Continue(output, items)
    },
  }
})()

export class AddCommand {
  constructor(private readonly arg: string) {}
  process(items: Item[]): Result {
    items.push(new Item(this.arg, 'todo'))
    return new Continue(toOutput(items), items)
  }
}

export class DoneCommand {
  constructor(private readonly arg: string) {}
  process(items: Item[]): Result {
    const index = parseInt(this.arg, 10)
    const item = items[index - 1]
    if (item === undefined) {
      const output = error('Done command must have a valid item index')
      return new Continue(output, items)
    } else {
      item.state = 'done'
      return new Continue(toOutput(items), items)
    }
  }
}

export const quitCommand: Command = {
  process(_items: Item[]): Result {
    return exit
  },
}

export class ErrorCommand {
  constructor(private readonly message: string) {}

  process(items: Item[]): Result {
    const output = error(this.message)
    return new Continue(output, items)
  }
}

export const unexpectedArgCommand: (cn: string) => Command = (commandName: string) =>
  new ErrorCommand(`${commandName} command does not take any arguments`)

export const missingArgCommand: (cn: string) => Command = (commandName: string) =>
  new ErrorCommand(`${commandName} command requires an argument`)

export const unknownCommand: Command = new ErrorCommand(
  'I do not understand your command.  Enter help to display available commands.',
)
