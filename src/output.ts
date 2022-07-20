type Color = 'red' | 'green' | 'yellow' | 'blue'

export class ColoredString {
  public constructor(public readonly color: Color, public readonly str: string) {}

  show(): string {
    const code = this.color2Code()
    return `\u001B[${code}m${this.str}\u001B[0m`
  }

  asOutput(): Output {
    return [[this]]
  }

  private color2Code(): number {
    switch (this.color) {
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
}

type Text = string | ColoredString
export type Line = Text[]
export type Output = Line[]

const showLine = (line: Line): string =>
  line.map((text) => (typeof text === 'string' ? text : text.show())).join(' ')

export const display = (output: Output) =>
  output.forEach((line) => console.log(showLine(line)))
