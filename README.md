TypeScript Overivew
===================


List ADT example
----------------

Files

- `src/list.ts`
- `test/list_test.ts`

Notes on src

- same runtime semantics as JavaScript
- types are compile time only; do not exist at runtime
- string literal types (nil, cons)
- Generic types: `List<A>`, `Cons<A>`
- union types: A list is a Cons or a Nill
- readonly, const
- module exports

Notes on tests

- smart casts in switch
  - cannot acces head or tail of list until type is proven to be cons
- exhastiveness checking in switch
  - never type
  - thrown exception is of type never
- return value of checkCons


Todo app example
----------------

Files

- src
    - `index.ts`: main loop
    - `output.ts`: output effects
    - `todo.ts`: core logic
- test
    - `todo\_test.ts`

Notes

- run the app with `npm start`
- Output type
    - Another ADT
    - kind & display()
    - A Class defines a type and a value (contructor function)
    - PrintHelpClass & NoopClass constructors are private
- Todo
  - Todo has a list of items
  - Item has a description and a state
  - dispatch returns Result
  - Result(Output, continue | exit)
  - All cases of switch return a Result
  - add & done return an Output
- index.js
    - node\_module import vs local (relative) import
    - no stack issuse because recursion is in callback
    - main loop of
        - input prompt
        - todo.dispatch()
        - output.display()
        - repeat or quit
- tests
    - All tests just call dispatch and assert on result
- Design for testability
    - Good: move IO out of core logic
    - Bad: mutation
    - Usually have to rely on dependency injection
      (think function parameters, not DI frameworks) when things are more complex
    - Very little logic in index.ts
- Todo.dispatch returns Output effect
    - does not perform IO, only describes


Review package.json
--------------------

- dependencies
- devDependencies
- scripts!
    - npm start
    - npm test
    - npm run test1
    - npm run lint
    - npm run doc
    - npm run all
