const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const submitBtn = document.querySelector('#submit-btn');
const todoList = document.querySelector('#todo-list');
const todoItem = document.querySelector('#todo-item');
const todoClearBtn = document.querySelector('#todo-clear-btn');
// Adding Todos
// Adding Todos

todoForm.addEventListener('submit', function (e) {
  //Stops form from reloading
  e.preventDefault();

  //add input value as a list item to ul
  todoList.insertAdjacentHTML(
    'beforeend',
    `<li id="todo-item">${todoInput.value}</li>`,
  );

  //Clears to do input field
  todoInput.value = '';
});

// Clearing all todos
todoClearBtn.addEventListener('click', function () {
  todoList.innerHTML = '';
});

// using concatanation '<li id="todo-item">' + todoInput.value + '</li>',

/*
ELement.insertAdjacentHTML positions

'beforebegin': Before the element itself.
'afterbegin': Just inside the element, before its first child.
'beforeend': Just inside the element, after its last child.
'afterend': After the element itself.

*/
