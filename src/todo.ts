import { PrintError, PrintList, Result, exit, printHelp } from './result.js'

export class Item {
  constructor(public description: string, public state: 'todo' | 'done') {}

  toString(
    index: number,
    green: (input: string) => string,
    grey: (input: string) => string,
  ): string {
    return this.state === 'todo'
      ? `${index + 1} ${green(this.description)}`
      : `${index + 1} ${grey(this.description)} (done)`
  }
}

export class Todo {
  private readonly list: Item[] = []

  public dispatch(command: string): Result {
    const c = command.trim()
    switch (this.firstWord(c)) {
      case 'help':
        return printHelp
      case 'list':
        return new PrintList(this.list)
      case 'add':
        return this.add(c)
      case 'done':
        return this.done(c)
      case 'quit':
        return exit
      default:
        return new PrintError(
          'I do not understand your command.  Enter help to display available commands.',
        )
    }
  }

  private add(line: string): Result {
    const i = line.indexOf(' ')
    if (i !== 3) {
      return new PrintError(
        'Add command must have space after add with ' +
          'a description that follows.\nExample: add buy hot dogs.',
      )
    } else {
      const description = line.slice(i + 1).trim()
      this.list.push(new Item(description, 'todo'))
      return new PrintList(this.list)
    }
  }

  private done(line: string): Result {
    const doneError = new PrintError(
      'Done command must have space after done with ' +
        'a valid index that follows.\nExample: done 3',
    )
    const i = line.indexOf(' ')
    if (i !== 4) {
      return doneError
    } else {
      const index = parseInt(line.slice(i + 1), 10) - 1
      const item = this.list[index]
      if (item === undefined) {
        return doneError
      } else {
        item.state = 'done'
        return new PrintList(this.list)
      }
    }
  }

  private firstWord(line: string): string {
    return line.replace(/ .*/, '')
  }
}
