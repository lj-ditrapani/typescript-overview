import { Cons, List, nil } from '../src/list'

const checkCons = (list: List<number>, n: number): List<number> => {
  switch (list.kind) {
    case 'cons':
      expect(list.head).toBe(n)
      return list.tail
    case 'nil':
      throw new Error('Expected Cons, found nil')
  }
}

const checkNil = (list: List<number>): null => {
  switch (list.kind) {
    case 'cons':
      throw new Error('Expected nil, found Cons')
    case 'nil':
      expect(list).toBe(nil)
      return null
  }
}

const checkList = (list: List<number>): void => {
  const list2 = checkCons(list, 1)
  const list3 = checkCons(list2, 2)
  const list4 = checkCons(list3, 3)
  checkNil(list4)
}

describe('List', () => {
  const list: List<number> = new Cons(1, new Cons(2, new Cons(3, nil)))

  it('is a list', () => {
    // This test only exists to show how to match on an ADT

    // This is not a good way to assert the structure of the list,
    // but it illustrates exhaustive ADT matching
    checkList(list)

    // These assertions do the same as above in a much safer way
    expect(list.toString()).toEqual('List( 1 2 3 )')
  })

  describe('isEmpty', () => {
    it('when the list is nil, returns true', () => {
      expect(nil.isEmpty()).toBe(true)
    })

    it('when the list is a Cons, returns false', () => {
      expect(new Cons(1, nil).isEmpty()).toBe(false)
    })
  })

  describe('reduce', () => {
    it('when the list is nil, returns the zero value', () => {
      expect(nil.reduce(0, (acc, i) => acc + i)).toBe(0)
      expect(nil.reduce(1, (acc, i) => acc * i)).toBe(1)
    })

    it('reduces list with f down to a B', () => {
      expect(list.reduce(0, (acc, i) => acc + i)).toBe(6)
      const list2 = new Cons(4, list)
      expect(list2.reduce(1, (acc, i) => acc * i)).toBe(24)
      const list3 = new Cons('hello', new Cons('world', nil))
      expect(list3.reduce('', (acc, i) => `${acc} ${i}`)).toBe(' hello world')
    })
  })

  describe('reverse', () => {
    it('when the list is nil, returns nil', () => {
      expect(nil.reverse()).toBe(nil)
    })

    it('returns the reverse of the list', () => {
      expect(list.reverse().toString()).toEqual('List( 3 2 1 )')
    })
  })

  describe('map', () => {
    it('when the list is nil, returns nil', () => {
      expect(nil.map((a) => a + 2)).toBe(nil)
    })

    it('applies f to each element and returns the new list', () => {
      expect(list.map((a) => a * 2).toString()).toEqual('List( 2 4 6 )')
    })
  })

  describe('size', () => {
    it('when the list is nil, returns 0', () => {
      expect(nil.size()).toBe(0)
    })

    it('returns the number of elements in the list', () => {
      expect(list.size()).toBe(3)
    })
  })

  describe('toString', () => {
    it('when the list is nil, returns List( )', () => {
      expect(nil.toString()).toBe('List( )')
    })

    it('returns a string representatino of the list', () => {
      expect(list.toString()).toBe('List( 1 2 3 )')
    })
  })
})
