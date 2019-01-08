import { Noop, Output, PrintError, PrintHelp, PrintList } from './output'

export class Result {
  constructor(readonly output: Output, readonly result: 'continue' | 'exit') {}
}

export class Item {
  constructor(public description: string, public state: 'todo' | 'done') {}
}

export class Todo {
  private readonly list: Item[] = []

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
    const i = line.indexOf(' ')
    if (i !== 3) {
      return new PrintError(
        'Add command must have space after add with ' +
          'a description that follows.\nExample: add buy hot dogs.'
      )
    } else {
      const description = line.slice(i + 1).trim()
      this.list.push(new Item(description, 'todo'))
      return Noop
    }
  }

  private done(line: string): Output {
    const doneError = new PrintError(
      'Done command must have space after done with ' +
        'a valid index that follows.\nExample: done 3'
    )
    const i = line.indexOf(' ')
    if (i !== 4) {
      return doneError
    } else {
      const index = parseInt(line.slice(i + 1), 10) - 1
      if (isNaN(index) || index < 0 || index >= this.list.length) {
        return doneError
      } else {
        this.list[index].state = 'done'
        return Noop
      }
    }
  }

  private firstWord(line: string): string {
    return line.split(' ')[0]
  }
}
