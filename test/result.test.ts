import { describe, it, expect, vi } from 'vitest'
import { Item } from '../src/item.js'
import { ColoredString } from '../src/output.js'
import { doneIndexError, exit, help, ListResult, next } from '../src/result.js'
import { Todo } from '../src/todo.js'

describe('StringResult.toOutput()', () => {
  it('returns the ColoredString as an Output', () => {
    const str = 'Done command must have a valid item index'
    expect(doneIndexError.toOuput()).toEqual([[new ColoredString('red', str)]])
  })
})

describe('Exit.toOutput()', () => {
  it('returns the "bye!" in blue as Output', () => {
    const str = 'bye!'
    expect(exit.toOuput()).toEqual([[new ColoredString('blue', str)]])
  })
})

describe('ListResult.toOutput()', () => {
  it('returns the list, with colors, as Output', () => {
    const list = [new Item('wash car', 'todo'), new Item('program', 'done')]
    const actualOutput = new ListResult(list).toOuput()
    const expectedOutput = [
      ['1', new ColoredString('green', 'wash car')],
      ['2', new ColoredString('blue', 'program'), '(done)'],
    ]
    expect(actualOutput).toEqual(expectedOutput)
  })
})

describe('next', () => {
  it('when result is exit, executes stop lambda', () => {
    const todo = new Todo()
    const loop = vi.fn()
    const stop = vi.fn()
    next(todo, exit, loop, stop)
    expect(stop).toHaveBeenCalled()
    expect(loop).not.toHaveBeenCalled()
  })

  it('when result is not exit, executes go lambda', () => {
    const todo = new Todo()
    const loop = vi.fn()
    const stop = vi.fn()
    next(todo, help, loop, stop)
    expect(loop).toHaveBeenCalled()
    expect(stop).not.toHaveBeenCalled()
  })
})
