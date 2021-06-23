const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const submitBtn = document.querySelector('#submit-btn');
const todoList = document.querySelector('#todo-list');
const todoItem = document.querySelector('#todo-item');
const todoErrorMessage = document.querySelector('#todo-error-message');

//* ADD TODOS
todoForm.addEventListener('submit', function (e) {
  //Stops form from reloading
  e.preventDefault();

  const splitedInput = todoInput.value.split(' ').join('');

  // Validate User input
  if (splitedInput === '') {
    todoErrorMessage.innerHTML =
      'please input a value <i class="fa fa-exclamation-triangle"></i>';
  } else if (splitedInput.length < 3) {
    todoErrorMessage.innerHTML =
      'Please enter atleast three characters <i class="fa fa-exclamation-triangle"></i>';
  } else {
    //add input value as a list item to ul
    todoList.insertAdjacentHTML(
      'afterbegin',
      `<li class="todo__bottom--item" draggable="true">
          <input type="checkbox" name="" id="" class="check">
          <p>${todoInput.value}</p>
          <i class="fa fa-trash-alt delete-icon" id="delete-btn"></i>
      </li>`,
    );

    //Clears to do input field
    todoInput.value = '';
    todoErrorMessage.textContent = '';
  }
});

// * DELETE TODO
todoList.addEventListener('click', function (e) {
  if (e.target.id === 'delete-btn') {
    e.target.parentElement.remove();
  }
});

//* EXTRA NOTES
// using concatanation '<li id="todo-item">' + todoInput.value + '</li>',

/*
ELement.insertAdjacentHTML positions

'beforebegin': Before the element itself.
'afterbegin': Just inside the element, before its first child.
'beforeend': Just inside the element, after its last child.
'afterend': After the element itself.

*/
