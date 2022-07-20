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
