import './css/componentes.css'

import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';



export const todoList = new TodoList();

console.log( 'todos', todoList.todos );

// todoList.todos.forEach(todo => {
//     crearTodoHtml( todo )
// });

todoList.todos.forEach( crearTodoHtml );
