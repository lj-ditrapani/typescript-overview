type Color = 'red' | 'green' | 'yellow' | 'blue'

class ColoredString {
  public constructor(public readonly str: string, public readonly color: Color) {}

  show(): string {
    const code = this.color2Code()
    return `\u001B[${code}m${this.str}\u001B[0m`
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
type Line = Text[]
type Output = Line[]
