import type { Item } from './todo.js'
import type { Output } from './output.js'

class Exit {
  kind: 'exit' = 'exit'
}

export class Continue {
  kind: 'continue' = 'continue'
  constructor(public readonly ouptput: Output, public readonly items: Item[]) {}
}

export const exit = new Exit()

export type Result = Exit | Continue

export const next = (
  result: Result,
  go: (c: Continue) => void,
  stop: () => void,
): void => {
  if (result.kind === 'continue') {
    go(result)
  } else {
    stop()
  }
}
