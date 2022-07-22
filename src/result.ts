import type { Output } from './output.js'
import type { Todo } from './todo.js'

class Exit {
  kind: 'exit' = 'exit'
}

export class Continue {
  kind: 'continue' = 'continue'
  constructor(public readonly ouptput: Output) {}
}

export const exit = new Exit()

export type Result = Exit | Continue

export const next = (
  todo: Todo,
  result: Result,
  go: (c: Continue, todo: Todo) => void,
  stop: () => void,
): void => {
  if (result.kind === 'continue') {
    go(result, todo)
  } else {
    stop()
  }
}
