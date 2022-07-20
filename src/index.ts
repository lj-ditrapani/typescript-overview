import { Continue, next } from './result.js'
import { Item, todo } from './todo.js'
import { display } from './output.js'
import readline from 'readline'

console.log('Todo list\n')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const go = (c: Continue) => {
  display(c.ouptput)
  loop(c.items)
}

const stop = () => {
  console.log('bye!')
  rl.close()
}

const loop = (items: Item[]) => {
  rl.question('Enter a command. Enter help to list available commands: ', (input) => {
    const result = todo(items, input)
    next(result, go, stop)
  })
}

loop([])
