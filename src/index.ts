import { next } from './result.js'
import { display } from './output.js'
import readline from 'readline'
import util from 'util'
import { Todo } from './todo.js'

console.log('Todo list\n')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const question = util.promisify(rl.question).bind(rl) as unknown as (
  s: string,
) => Promise<string>

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
