import { next } from './result.js'
import { display } from './output.js'
import readline from 'readline'
import { Todo } from './todo.js'

console.log('Todo list\n')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const question = (query: string) =>
  new Promise<string>((resolve, _reject) =>
    rl.question(query, answer => resolve(answer)),
  )

const stop = (): 'done' => {
  rl.close()
  return 'done'
}

const loop = async (todo: Todo): Promise<'done'> => {
  const input: string = await question(
    'Enter a command. Enter help to list available commands: ',
  )
  const result = todo.dispatch(input)
  display(result.toOuput())
  return next(todo, result, loop, stop)
}

loop(new Todo())
