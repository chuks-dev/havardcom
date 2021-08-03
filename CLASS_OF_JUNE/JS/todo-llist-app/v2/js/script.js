const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const clearTodo = document.querySelector('#clear-todo');
const container = document.querySelector('#container');
const deleteBtn = document.querySelector('#delete-btn');
const error = document.querySelector('#error');

todoForm.addEventListener('submit', function (e) {
	e.preventDefault();
	let splitedInput = todoInput.value.split(' ').join('');

	if (splitedInput.length < 3) {
		showError('You must have at least three characters');
	} else if (splitedInput.length > 50) {
		showError('Maximum of 50 characters only');
	} else {
		todoList.insertAdjacentHTML(
			'afterbegin',
			`<li>
                   <span>
                       <input type="checkbox" id="todo-checkbox">
                       <span>${todoInput.value}</span>
                   </span>
                    <i class="fas fa-trash-alt" id="delete-btn"></i> 
                   
                </li>`,
		);
		todoInput.value = '';
	}
});

clearTodo.addEventListener('click', function () {
	todoList.innerHTML = '';
});

error.addEventListener('click', function (e) {
	if (e.target.id === 'close-error') {
		e.target.parentElement.remove();
	}
});

todoList.addEventListener('click', function (e) {
	if (e.target.id === 'delete-btn') {
		let confirmDelete = confirm('Press Ok to delete this item');
		console.log(confirmDelete);
		if (confirmDelete) {
			e.target.parentElement.remove();
		}
	}
});

function showError(errorMessage) {
	error.innerHTML = '';
	error.insertAdjacentHTML(
		'afterbegin',
		`
			  <div id="error-container">
                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>

                    <p>${errorMessage}</p>

                    <i class="fas fa-times" id="close-error"></i>
                </div>`,
	);
}
