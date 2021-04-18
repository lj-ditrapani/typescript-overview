// import assert from 'assert'
import { noop, exit, printHelp } from '../src/result'

describe('printHelp', () => {
  xit('displays the help text', () => {
    // const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    printHelp.display()
    expect(log).not.toBeCalled()
    log.mockReset()
  })
})

describe('noop.display()', () => {
  xit('displays nothing', () => {
    // const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    noop.display()
    expect(log).not.toBeCalled()
    log.mockReset()
  })
})

describe('exit.display()', () => {
  xit('displays nothing', () => {
    // const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    exit.display()
    expect(log).not.toBeCalled()
    log.mockReset()
  })
})
