// import assert from 'assert'
import { noop, exit, printHelp, PrintError, PrintList } from '../src/result'
import { Item } from '../src/todo'

describe('printHelp.display()', () => {
  it('displays the help text', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {
      /* do nothing */
    })
    printHelp.display()
    expect(log).toBeCalled()
    log.mockReset()
  })
})

describe('PrintError.display()', () => {
  it('displays the help text', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {
      /* do nothing */
    })
    new PrintError('the error').display()
    expect(error).toBeCalled()
    error.mockReset()
  })
})

describe('PrintList.display()', () => {
  it('displays the help text', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {
      /* do nothing */
    })
    const itemList = [new Item('build robot', 'done'), new Item('conquer world', 'todo')]
    new PrintList(itemList).display()
    expect(log).toBeCalled()
    log.mockReset()
  })
})

describe('noop.display()', () => {
  it('displays nothing', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {
      /* do nothing */
    })
    noop.display()
    expect(log).not.toBeCalled()
    log.mockReset()
  })
})

describe('exit.display()', () => {
  it('displays nothing', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {
      /* do nothing */
    })
    exit.display()
    expect(log).not.toBeCalled()
    log.mockReset()
  })
})
