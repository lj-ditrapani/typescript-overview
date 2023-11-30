import { describe, it, expect } from 'vitest'
import { Cons, List, mkList, nil } from '../src/list'

describe('List', () => {
  const list: List<number> = mkList(1, 2, 3)

  describe('mkList', () => {
    it('List factory function to make lists easier', () => {
      expect(list).toEqual(new Cons(1, new Cons(2, new Cons(3, nil))))
      expect(mkList('1', '2', '3')).toEqual(
        new Cons('1', new Cons('2', new Cons('3', nil))),
      )
    })
  })

  describe('isEmpty', () => {
    it('when the list is nil, returns true', () => {
      expect(nil.isEmpty()).toBe(true)
    })

    it('when the list is a Cons, returns false', () => {
      expect(list.isEmpty()).toBe(false)
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
      expect(list.reverse()).toEqual(mkList(3, 2, 1))
    })
  })

  describe('map', () => {
    it('when the list is nil, returns nil', () => {
      expect(nil.map((a) => a + 2)).toBe(nil)
    })

    it('applies f to each element and returns the new list', () => {
      expect(list.map((a) => a * 2)).toEqual(mkList(2, 4, 6))
    })
  })

  describe('flatMap', () => {
    const strToList = (s: string): List<string> =>
      [...s].reduce<List<string>>((acc, val) => new Cons(val, acc), nil).reverse()

    it('when the list is nil, returns nil', () => {
      expect(nil.flatMap<string>((a) => strToList(a))).toBe(nil)
    })

    it('applies f to each element and concats the lists together', () => {
      const list1 = mkList('12', '34')
      const list2 = mkList('1', '2', '3', '4')
      const list3 = mkList(1, 2, 3, 4)
      expect(list1.flatMap<string>((a) => strToList(a))).toEqual(list2)
      expect(list1.flatMap<number>((a) => strToList(a).map(parseInt))).toEqual(list3)
    })
  })

  describe('filter', () => {
    it('selects elements from a list', () => {
      expect(mkList(1, 2, 3, 4).filter((item) => item > 2)).toEqual(mkList(3, 4))
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
