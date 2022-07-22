import { Continue, next } from './result.js'
import { display } from './output.js'
import readline from 'readline'
import { Todo } from './todo.js'

console.log('Todo list\n')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const go = (c: Continue, todo: Todo) => {
  display(c.ouptput)
  loop(todo)
}

const stop = () => {
  console.log('bye!')
  rl.close()
}

const loop = (todo: Todo) => {
  rl.question('Enter a command. Enter help to list available commands: ', (input) => {
    const result = todo.dispatch(input)
    next(todo, result, go, stop)
  })
}

loop(new Todo())
