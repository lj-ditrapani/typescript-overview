import { ColoredString, Output } from './output.js'
import { Item, toOutput } from './todo.js'

class Exit {
  kind: 'exit' = 'exit'
}

export class Continue {
  kind: 'continue' = 'continue'
  constructor(public readonly ouptput: Output, public readonly items: Item[]) {}
}

export const exit = new Exit()

export type Result = Exit | Continue

class HelpCommand {
  public readonly output: Output = new ColoredString(
    'yellow',
    `
      Available commands:
      help                              Displays this help
      list                              Display the todo list
      add <todo item description>       Adds the item to the todo list
      done <todo item number>           Marks the item as done
      quit                              Exit the program`,
  ).asOutput()

  process(items: Item[]): Result {
    return new Continue(this.output, items)
  }
}

export const helpCommand = new HelpCommand()

class ListCommand {
  public readonly emptyListHint: Output = new ColoredString(
    'yellow',
    'List is empty.  Try adding some items',
  ).asOutput()

  process(items: Item[]): Result {
    const output = items.length == 0 ? this.emptyListHint : toOutput(items)
    return new Continue(output, items)
  }
}

export const listCommand = new ListCommand()

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
    const item = items[index]
    if (item === undefined) {
      const output = error('Done command must have a valid item index')
      return new Continue(output, items)
    } else {
      item.state = 'done'
      return new Continue(toOutput(items), items)
    }
  }
}

class QuitCommand {
  process(_items: Item[]): Result {
    return exit
  }
}

export const quitCommand = QuitCommand

export class UnexpectedArgCommand {
  constructor(private readonly commandName: string) {}

  process(items: Item[]): Result {
    const output = error(`${this.commandName} command does not take any arguments`)
    return new Continue(output, items)
  }
}

export class MissingArgCommand {
  constructor(private readonly commandName: string) {}

  process(items: Item[]): Result {
    const output = error(`${this.commandName} command requires an argument`)
    return new Continue(output, items)
  }
}

class UnknownCommand {
  private readonly output = error(
    'I do not understand your command.  Enter help to display available commands.',
  )
  process(items: Item[]): Result {
    return new Continue(this.output, items)
  }
}

export const unknownCommand = new UnknownCommand()

const error = (text: string): Output => new ColoredString('red', text).asOutput()
