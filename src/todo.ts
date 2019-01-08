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
    switch (this.firstWord(c)) {
      case 'help':
        return new Result(PrintHelp, 'continue')
      case 'list':
        return new Result(new PrintList(this.list), 'continue')
      case 'add':
        return new Result(this.add(c), 'continue')
      case 'done':
        return new Result(this.done(c), 'continue')
      case 'quit':
        return new Result(Noop, 'exit')
      default:
        return new Result(
          new PrintError(
            'I do not understand your command.  Enter help to display available commands.'
          ),
          'continue'
        )
    }
  }

  private add(line: string): Output {
    const i = line.indexOf(' ') + 1
    const description = line.slice(i)
    this.list.push(new Item(description, 'todo'))
    return Noop
  }

  private done(line: string): Output {
    const i = line.indexOf(' ') + 1
    const index = parseInt(line.slice(i), 10) - 1
    this.list[index].state = 'done'
    return Noop
  }

  private firstWord(line: string): string {
    return line.split(' ')[0]
  }
}
