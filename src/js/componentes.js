import { todoList } from "../index"
import { Todo } from "../classes"



const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {
 const htmlTodo =
    `<li class="${( todo.completado )? 'completed': '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${( todo.completado )? 'checked' : ''}>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`
   const div = document.createElement('div');
   div.innerHTML = htmlTodo;

   divTodoList.append(div.firstElementChild); 

   return div.firstElementChild;
}

// eventos

txtInput.addEventListener('keyup', ( event ) => {
    // console.log(event.keyCode);
    // console.log(txtInput.value);
    if( event.keyCode === 13 && txtInput.value.length > 0 ){
        console.log(event.keyCode);
        const nuevoTodo = new Todo( txtInput.value )
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );
        txtInput.value = '';

    }
        
});



divTodoList.addEventListener('click', (event) =>{
    // console.log(event.target.localName); // Nombre elemeneto Input label Button
    // console.log('click');
    const nombreElemento = event.target.localName;
    const todoTodoElemento = event.target.parentElement.parentElement;
    const todoId = todoTodoElemento.getAttribute('data-id');

    console.log(todoId);
    console.log(todoTodoElemento);
    console.log(nombreElemento);

    if(nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId);
        todoTodoElemento.classList.toggle('completed');
        console.log(todoTodoElemento);
    }else if (nombreElemento.includes('button')){
        todoList.eliminarCompletados(todoId);
        divTodoList.removeChild(todoTodoElemento);
    }
});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();
    
    for( let i = divTodoList.children.length-1; i >= 0; i-- ) {

        const elemento = divTodoList.children[i];
        if( elemento.classList.contains('completed') ){
            divTodoList.removeChild(elemento);
        }

    }

});


ulFiltros.addEventListener('click', (event) =>{
    console.log(event.target.text);
    const filtro = event.target.text;

    if (!filtro) return;

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));

    event.target.classList.add('selected');

    for(const elemento of divTodoList.children ){
        console.log(elemento);

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ){

            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
            break;

            
        }

    }

})