import { Noop, Output, PrintError, PrintHelp, PrintList } from './output'

export class Result {
  constructor(readonly output: Output, readonly result: 'continue' | 'exit') {}
}

type State = 'todo' | 'done'

export class Item {
  constructor(public description: string, public state: State) {}
}

export class Todo {
  public readonly list: Item[] = []

  public dispatch(command: string): Result {
    const c = command.trim()
    if (c.startsWith('help')) {
      return new Result(PrintHelp, 'continue')
    } else if (c.startsWith('list')) {
      return new Result(PrintList(this.list), 'continue')
    } else if (c.startsWith('add')) {
      this.add(c)
      return new Result(Noop, 'continue')
    } else if (c.startsWith('done')) {
      this.done(c)
      return new Result(Noop, 'continue')
    } else if (c.startsWith('quit')) {
      return new Result(Noop, 'exit')
    } else {
      return new Result(
        PrintError(
          'I do not understand your command.  Enter help to display available commands.'
        ),
        'continue'
      )
    }
  }

  private add(line: string): void {
    const i = line.indexOf(' ') + 1
    const description = line.slice(i)
    this.list.push(new Item(description, 'todo'))
  }

  private done(line: string): void {
    const i = line.indexOf(' ') + 1
    const index = parseInt(line.slice(i), 10) - 1
    this.list[index].state = 'done'
  }
}
