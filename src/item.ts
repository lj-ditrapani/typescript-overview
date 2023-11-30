import { ColoredString, type Line, type Output } from './output.js'

export class Item {
  constructor(
    public description: string,
    public state: 'todo' | 'done',
  ) {}

  toLine(index: number): Line {
    return this.state === 'todo'
      ? [`${index + 1}`, new ColoredString('green', this.description)]
      : [`${index + 1}`, new ColoredString('blue', this.description), '(done)']
  }
}

export const toOutput = (items: Item[]): Output =>
  items.map((item, index) => item.toLine(index))
