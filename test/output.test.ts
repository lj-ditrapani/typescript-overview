import { describe, it, expect, vi } from 'vitest'
import { ColoredString, display, type Output } from '../src/output.js'

type Color = 'red' | 'green' | 'yellow' | 'blue'

describe('ColoredString.show', () => {
  const testCases: [Color, number][] = [
    ['red', 31],
    ['green', 32],
    ['yellow', 33],
    ['blue', 34],
  ]
  testCases.forEach(([color, code]) => {
    it(`when the color is ${color}, marks-up the string with the ansi code ${code}`, () => {
      const message = 'test string'
      const string = new ColoredString(color, message).show()
      expect(string).toBe(`\u001B[${code}mtest string\u001B[0m`)
    })
  })

  it('visual test', () => {
    const output: Output = [
      [
        '\n[start visual test',
        new ColoredString('red', 'red'),
        new ColoredString('green', 'green'),
        new ColoredString('yellow', 'yellow'),
        new ColoredString('blue', 'blue'),
        'end visual test]\n',
      ],
    ]
    display(output)
  })
})

describe('display', () => {
  it('converts the Lines to colored strings and writes them to the console', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {
      /* do nothing */
    })
    const output = [['default', new ColoredString('yellow', 'help text'), 'default']]
    display(output)
    expect(log).toHaveBeenCalledWith('default \u001B[33mhelp text\u001b[0m default')
    log.mockReset()
  })
})
