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
- structural vs nominal typing
- smart casts in reduce
  - cannot access head or tail of list until type is proven to be cons


Todo app example
----------------

Files

- src
    - `index.ts`: main loop (REPL)
    - `item.ts` : a single todo item
    - `output.ts` : structure of output to be displayed & ColoredString
    - `result.ts`: return type of todo.dispatch()
    - `todo.ts`: Todo class with core logic (todo.dispatch())
- test
    - `test/todo.test.ts`
    - `test/result.test.ts`
    - `test/output.test.ts`

Notes

- run the app with `npm start`
- This is a `read, eval, print loop` (REPL) program

- Result type
    - A Class defines a type and a value (constructor function)
    - next() has type narrowing & exhaustive checking
- Todo
    - Todo has a list of items
    - Item has a description and a state
    - dispatch returns Result
    - All cases of switch return a Result
    - add & done return a Result
- index.ts
    - node\_module import vs local (relative) import
    - no stack issues because recursion is in callback
    - main loop of
        - input prompt
        - todo.dispatch()
        - `dsplay(result.toOutput())`
        - repeat or quit
- output.ts
    - switch on color in ColoredString is exhaustive
- tests
    - All todo tests just call dispatch and assert on result
- Design for testability
    - Good: move IO out of core logic
    - Bad: mutation
    - Usually have to rely on dependency injection
      (think function parameters, not DI frameworks) when things are more complex
    - No branching logic in index.ts
- Todo.dispatch returns Result
    - does not perform IO, only describes it


Review package.json
--------------------

- dependencies
- devDependencies
- Go over developing section & npm scripts.


Further reading
---------------

[Typescript Handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html).


Developing
----------

Install node 16.  You can use nvm to manage node versions.


### First time install ###

    npm install


### Run it ###

    npm start


### Format, lint, build, test ###

    npm run all


### Test coverage ###

    # Run the tests with `npm run all` or
    npm test
    # This will generate the test coverage report
    # Then open the test coverage report
    firefox coverage/lcov-report/index.html


### Generate documentation ###

    npm run doc
    firefox docs/index.html &


### Update dependencies ###

    npm run ncu


Author:  Lyall Jonathan Di Trapani
