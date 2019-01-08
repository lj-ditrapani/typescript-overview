import readline from 'readline'
import { IoImpl } from './io'
import { Todo } from './todo'

console.log('Todo list\n')

const todo = new Todo(new IoImpl())

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const loop = () => {
  rl.question('Enter a command. Enter help to list available commands: ', command => {
    const result = todo.dispatch(command)
    if (result === 'exit') {
      console.log('bye!')
      rl.close()
    } else {
      loop()
    }
  })
}

loop()
