import { Item } from './todo'
import chalk from 'chalk'

export type Result = PrintHelpClass | PrintError | PrintList | NoopClass | ExitClass

class PrintHelpClass {
  public readonly kind: 'help' = 'help'

  public display(): void {
    console.log(
      chalk.yellow(
        `
      Available commands:
      help                              Displays this help
      list                              Display the todo list
      add <todo item description>       Adds the item to the todo list
      done <todo item number>           Marks the item as done
      quit                              Exit the program`,
      ),
    )
  }
}

export const printHelp = new PrintHelpClass()

export class PrintError {
  public readonly kind: 'error' = 'error'

  constructor(public readonly err: string) {}

  public display(): void {
    console.error(chalk.red(this.err))
  }
}

export class PrintList {
  public readonly kind: 'list' = 'list'

  constructor(public readonly list: ReadonlyArray<Item>) {}

  public display(): void {
    this.list.forEach((item: Item, index: number) => {
      console.log(item.toString(index, chalk.green, chalk.hex('#888888')))
    })
  }
}

class NoopClass {
  public readonly kind: 'noop' = 'noop'

  public display(): void {
    return
  }
}

export const noop = new NoopClass()

class ExitClass {
  public readonly kind: 'exit' = 'exit'

  public display(): void {
    return
  }
}

export const exit = new ExitClass()

export const next = (result: Result, loop: () => void, stop: () => void): void => {
  if (result === exit) {
    stop()
  } else {
    loop()
  }
}
