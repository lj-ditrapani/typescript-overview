// import assert from 'assert'
import { noop, exit, printHelp } from '../src/result'

describe('printHelp', () => {
  it('displays the help text', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {
      /* do nothing */
    })
    printHelp.display()
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
