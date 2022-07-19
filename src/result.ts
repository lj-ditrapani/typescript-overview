import type { Item } from './todo.js'

type Color = 'red' | 'green' | 'yellow' | 'blue'

const colored = (color: Color, str: string): string => {
  const code = color2Code(color)
  return `\u001B[${code}m${str}\u001B[0m`
}

const color2Code = (color: Color): number => {
  switch (color) {
    case 'red':
      return 31
    case 'green':
      return 32
    case 'yellow':
      return 33
    case 'blue':
      return 34
  }
}

export type Result = PrintHelpClass | PrintError | PrintList | ExitClass

class PrintHelpClass {
  public readonly kind: 'help' = 'help'

  public display(): void {
    console.log(
      colored(
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
  }
}

export const printHelp = new PrintHelpClass()

export class PrintError {
  public readonly kind: 'error' = 'error'

  constructor(public readonly err: string) {}

  public display(): void {
    console.error(colored('red', this.err))
  }
}

export class PrintList {
  public readonly kind: 'list' = 'list'

  constructor(public readonly list: ReadonlyArray<Item>) {}

  public display(): void {
    this.list.forEach((item: Item, index: number) => {
      console.log(
        item.toString(
          index,
          (str) => colored('green', str),
          (str) => colored('blue', str),
        ),
      )
    })
  }
}

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
