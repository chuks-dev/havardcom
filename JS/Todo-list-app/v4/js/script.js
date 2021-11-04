const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const submitBtn = document.querySelector('#submit-btn');
const todoList = document.querySelector('#todo-list');
const todoItem = document.querySelector('#todo-item');
const todoErrorMessage = document.querySelector('#todo-error-message');
const dataFromLocalStorage = JSON.parse(localStorage.getItem('todos'));

let todos = dataFromLocalStorage === null ? [] : dataFromLocalStorage;

//EVENT LISTENERS

todoForm.addEventListener('submit', e => {
  e.preventDefault();
  const splittedText = todoInput.value.split(' ').join('');
  if (splittedText === '') {
    showError(
      'please input a value <i class="fa fa-exclamation-triangle"></i>',
    );
  } else if (splittedText.length < 3) {
    showError(
      'Please enter atleast three characters <i class="fa fa-exclamation-triangle"></i>',
    );
  } else {
    todos.push(todoInput.value);
    addToLocalStorage();
    showList();
  }
});

todoList.addEventListener('click', function (e) {
  if (e.target.id === 'delete-btn') {
    const index = todos.indexOf(
      e.target.parentElement.querySelector('p').textContent,
    );
    if (index > -1) {
      todos.splice(index, 1);
      addToLocalStorage();
      showList();
    }
  }
});

//FUNCTIONS

function showError(str) {
  todoErrorMessage.innerHTML = str;
}

function addToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function showList() {
  todoList.innerHTML = '';
  todos.forEach(todo => {
    todoList.insertAdjacentHTML(
      'afterbegin',
      `<li class="todo__bottom--item" draggable="true">
          <input type="checkbox" name="" id="" class="check">
          <p>${todo}</p>
          <i class="fa fa-trash-alt delete-icon" id="delete-btn"></i>
      </li>`,
    );
  });
  todoInput.value = '';
  todoErrorMessage.textContent = '';
}

showList();
