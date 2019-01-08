import { Item } from './todo'

export type Output = PrintHelpClass | PrintError | PrintList | NoopClass

class PrintHelpClass {
  public readonly kind: 'help' = 'help'

  public display(): void {
    console.log(
      `
      Available commands:
      help                              Displays this help
      list                              Display the todo list
      add <todo item description>       Adds the time to the todo list
      done <todo item number>           Marks the item as done
      quit                              Exit the program`
    )
  }
}

export const PrintHelp = new PrintHelpClass()

export class PrintError {
  public readonly kind: 'error' = 'error'

  constructor(public readonly err: string) {}

  public display(): void {
    console.error(this.err)
  }
}

export class PrintList {
  public readonly kind: 'list' = 'list'

  constructor(public readonly list: Item[]) {}

  public display(): void {
    this.list.forEach((item: Item, index: number) => {
      if (item.state === 'todo') {
        console.log(`${index + 1} ${item.description}`)
      } else {
        console.log(`${index + 1} ${item.description} DONE!`)
      }
    })
  }
}

class NoopClass {
  public readonly kind: 'noop' = 'noop'

  public display(): void {
    return
  }
}

export const Noop = new NoopClass()
