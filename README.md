TypeScript Overivew
===================

Here's a couple of small code examples to teach Typescript basics.
Start by reviewing <https://learnxinyminutes.com/docs/typescript/>.
Then `npm install` and go through the 2 examples.


List ADT example
----------------

Files

- `src/list.ts`
- `test/list.test.ts`

Notes on src

- same runtime semantics as JavaScript
- types are compile time only; do not exist at runtime
- string literal types (kind = nil | cons)
- Generic types: `List<A>`, `Cons<A>`
- union types: A list is a Cons or a Nil
- readonly, const
- module exports

Notes on tests

- smart casts in switch
  - cannot access head or tail of list until type is proven to be cons
- exhaustiveness checking in switch
  - never type
  - thrown exception is of type never
- return value of checkCons
- This is a bad way to write tests.  Generally avoid logic in test
  code.  This was done just to illustrate smart casts &
  exhaustiveness checking.


Todo app example
----------------

Files

- src
    - `index.ts`: main loop
    - `result.ts`: Result effects
    - `todo.ts`: core logic
- test
    - `test/todo.test.ts`

Notes

- run the app with `npm start`
- This is a `read, eval, print loop` (REPL) program
- Result type
    - Another ADT
    - kind & display()
    - A Class defines a type and a value (constructor function)
    - PrintHelpClass, NoopClass & ExitClass constructors are private
- Todo
    - Todo has a list of items
    - Item has a description and a state
    - dispatch returns Result
    - All cases of switch return a Result
    - add & done return a Result
- index.js
    - node\_module import vs local (relative) import
    - no stack issuse because recursion is in callback
    - main loop of
        - input prompt
        - todo.dispatch()
        - result.display()
        - repeat or quit
- tests
    - All tests just call dispatch and assert on result
- Design for testability
    - Good: move IO out of core logic
    - Bad: mutation
    - Usually have to rely on dependency injection
      (think function parameters, not DI frameworks) when things are more complex
    - Very little logic in index.ts
- Todo.dispatch returns Result effect
    - does not perform IO, only describes


Review package.json
--------------------

- dependencies
- devDependencies
- scripts!
    - `npm start`
    - `npm test`
        - `firefox coverage/lcov-report/index.html`
    - `npm test test/list.test.ts`
    - `npm run lint`
    - `npm run doc`
    - `npm run all`
- Update dependencies
  `npm run ncu`


Further reading
---------------

[Typescript Handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html).
