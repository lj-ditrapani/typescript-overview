import { Item } from './todo'

type Kind = 'help' | 'error' | 'list' | 'noop'

export class Output {
  constructor(public readonly kind: Kind, public readonly display: () => void) {}
}

export const PrintHelp = new Output('help', () => {
  console.log(
    `
      Available commands:
      help                              Displays this help
      list                              Display the todo list
      add <todo item description>       Adds the time to the todo list
      done <todo item number>           Marks the item as done
      quit                              Exit the program`
  )
})

export const PrintError = (err: string) =>
  new Output('error', () => {
    console.error(err)
  })

export const PrintList = (list: Item[]) =>
  new Output('list', () => {
    for (const item of list) {
      if (item.state === 'todo') {
        console.log(item.description)
      } else {
        console.log(item.description)
      }
    }
  })

export const Noop = new Output('noop', () => {
  return
})
