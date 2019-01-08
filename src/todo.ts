import { Io } from './io'

type State = 'todo' | 'done'
type Result = 'continue' | 'exit'

export class Item {
  constructor(public description: string, public state: State) {}
}

export class Todo {
  public readonly list: Item[] = []

  constructor(private io: Io) {}

  public add(line: string): void {
    const i = line.indexOf(' ') + 1
    const description = line.slice(i)
    this.list.push(new Item(description, 'todo'))
  }

  public done(line: string): void {
    const i = line.indexOf(' ') + 1
    const index = parseInt(line.slice(i), 10) - 1
    this.list[index].state = 'done'
  }

  public listItems(): void {
    for (const item of this.list) {
      if (item.state === 'todo') {
        this.io.printTodo(item.description)
      } else {
        this.io.printDone(item.description)
      }
    }
  }

  public dispatch(command: string): Result {
    const c = command.trim()
    if (c.startsWith('help')) {
      this.io.printHelp()
      return 'continue'
    } else if (c.startsWith('list')) {
      this.listItems()
      return 'continue'
    } else if (c.startsWith('add')) {
      this.add(c)
      return 'continue'
    } else if (c.startsWith('done')) {
      this.done(c)
      return 'continue'
    } else if (c.startsWith('quit')) {
      return 'exit'
    } else {
      this.io.printError(
        'I do not understand your command.  Enter help to display available commands.'
      )
      return 'continue'
    }
  }
}
