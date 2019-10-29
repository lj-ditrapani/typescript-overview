import readline from 'readline'
import { exit } from './result'
import { Todo } from './todo'

console.log('Todo list\n')

const todo = new Todo()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const loop = () => {
  rl.question('Enter a command. Enter help to list available commands: ', input => {
    const result = todo.dispatch(input)
    result.display()
    if (result === exit) {
      console.log('bye!')
      rl.close()
    } else {
      loop()
    }
  })
}

loop()
