import { Todo } from './todo'
import { next } from './result'
import readline from 'readline'

console.log('Todo list\n')

const todo = new Todo()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const stop = () => {
  console.log('bye!')
  rl.close()
}

const loop = () => {
  rl.question('Enter a command. Enter help to list available commands: ', (input) => {
    const result = todo.dispatch(input)
    result.display()
    next(result, loop, stop)
  })
}

loop()
