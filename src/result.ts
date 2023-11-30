import { ColoredString, type Output } from './output.js'
import type { Todo } from './todo.js'
import { Item, toOutput } from './item.js'

export type Result = Readonly<{
  kind: 'exit' | 'continue'
  toOuput(): Output
}>

class StringResult implements Result {
  kind = 'continue' as const
  constructor(private readonly str: ColoredString) {}

  toOuput(): Output {
    return this.str.asOutput()
  }
}

class ErrorResult extends StringResult {
  constructor(readonly error: string) {
    super(new ColoredString('red', error))
  }
}

export const help = new StringResult(
  new ColoredString(
    'yellow',
    `
      Available commands:
      help                              Displays this help
      list                              Display the todo list
      add <todo item description>       Adds the item to the todo list
      done <todo item number>           Marks the item as done
      quit                              Exit the program`,
  ),
)

export class ListResult implements Result {
  kind = 'continue' as const

  constructor(private readonly items: Item[]) {}

  toOuput(): Output {
    return toOutput(this.items)
  }
}

export const emptyListHint = new StringResult(
  new ColoredString('yellow', 'List is empty.  Try adding some items'),
)

export const doneIndexError: Result = new ErrorResult(
  'Done command must have a valid item index',
)

export const unexpectedArg: (cn: string) => Result = (commandName: string) =>
  new ErrorResult(`${commandName} command does not take any arguments`)

export const missingArg: (cn: string) => Result = (commandName: string) =>
  new ErrorResult(`${commandName} command requires an argument`)

export const unknown: Result = new ErrorResult(
  'I do not understand your command.  ' + 'Enter help to display available commands.',
)

export const exit: Result = {
  kind: 'exit' as const,
  toOuput(): Output {
    return new ColoredString('blue', 'bye!').asOutput()
  },
}

export const next = async (
  todo: Todo,
  result: Result,
  loop: (todo: Todo) => Promise<'done'>,
  stop: () => 'done',
): Promise<'done'> => {
  switch (result.kind) {
    case 'continue':
      return await loop(todo)
    case 'exit':
      return stop()
  }
}
