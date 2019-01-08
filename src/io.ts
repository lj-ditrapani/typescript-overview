export interface Io {
  printTodo(line: string): void
  printDone(line: string): void
  printHelp(): void
  printError(err: string): void
}

export class IoImpl implements Io {
  public printTodo(line: string): void {
    console.log(line)
  }

  public printDone(line: string): void {
    console.log(line)
  }

  public printHelp(): void {
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

  public printError(err: string): void {
    console.error(err)
  }
}
