import { Item } from './item.js'
import {
  doneIndexError,
  emptyListHint,
  exit,
  help,
  ListResult,
  missingArg,
  Result,
  unexpectedArg,
  unknown,
} from './result.js'

export class Todo {
  private readonly items: Item[] = []

  dispatch(input: string): Result {
    const trimmed = input.trim()
    const index = trimmed.search(/\s/)
    const [first, second] =
      index === -1
        ? [trimmed]
        : [trimmed.slice(0, index).trim(), trimmed.slice(index, input.length).trim()]
    if (second === undefined) {
      switch (first) {
        case 'help':
          return help
        case 'list':
          return this.processList()
        case 'quit':
          return exit
        case 'add':
        case 'done':
          return missingArg(first)
        default:
          return unknown
      }
    } else {
      switch (first) {
        case 'add':
          return this.processAdd(second)
        case 'done':
          return this.processDone(second)
        case 'help':
        case 'list':
        case 'quit':
          return unexpectedArg(first)
        default:
          return unknown
      }
    }
  }

  private processList(): Result {
    return this.items.length == 0 ? emptyListHint : new ListResult(this.items)
  }

  private processAdd(arg: string): Result {
    this.items.push(new Item(arg, 'todo'))
    return new ListResult(this.items)
  }

  private processDone(arg: string): Result {
    const index = parseInt(arg, 10)
    const item = this.items[index - 1]
    if (item === undefined) {
      return doneIndexError
    } else {
      item.state = 'done'
      return new ListResult(this.items)
    }
  }
}
