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
  checkNil(list3)
}

describe('List', () => {
  const list: List<number> = new Cons(1, new Cons(2, new Cons(3, nil)))

  xit('is a list', () => {
    // This test only exists to show how to match on an ADT

    // This is not a good way to assert the structure of the list,
    // but it illustrates exhaustive ADT matching
    checkList(list)

    // These assertions do the same as above in a much safer way
    expect(list).toStrictEqual(new Cons(1, new Cons(2, nil)))
    expect(list).not.toStrictEqual(new Cons(1, new Cons(3, nil)))
    expect(list).not.toStrictEqual(new Cons(1, nil))
  })

  describe('isEmpty', () => {
    it("when the list is nil, returns true", () => {
      expect(nil.isEmpty()).toBe(true)
    })

    it("when the list is a Cons, returns false", () => {
      expect(new Cons(1, nil).isEmpty()).toBe(false)
    })
  })

  describe('reverse', () => {
    it("when the list is nil, returns nil", () => {
      expect(nil.reverse()).toBe(nil)
    })

    it("returns the reverse of the list", () => {
      expect(list.reverse()).toStrictEqual(new Cons(3, new Cons(2, new Cons(1, nil))))
    })
  })

  describe('size', () => {
    it("when the list is nil, returns 0", () => {
      expect(nil.size()).toBe(0)
    })

    it("returns the number of elements in the list", () => {
      expect(list.size()).toBe(3)
    })
  })

  describe('toString', () => {
    it("when the list is nil, returns List( )", () => {
      expect(nil.toString()).toBe('List( )')
    })

    it("returns a string representatino of the list", () => {
      expect(list.toString()).toBe('List( 1 2 3 )')
    })
  })
})
