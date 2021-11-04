const form = document.querySelector('#form');
const title = document.querySelector('#title');
const list = document.querySelector('#list');
const clear = document.querySelector('#clear');

// localStorage.setItem('Cat', 'Tom'); //create an item
// console.log(localStorage.getItem('Cat')); //gets item
// localStorage.removeItem('Cat');

let items =
	localStorage.getItem('myList') === null
		? []
		: JSON.parse(localStorage.getItem('myList'));

form.addEventListener('submit', e => {
	e.preventDefault();
	items.push(title.value);
	localStorage.setItem('myList', JSON.stringify(items));
	title.value = '';
	showList();
});

clear.addEventListener('click', e => {
	localStorage.removeItem('myList');
	items = [];
	showList();
});

function showList() {
	list.innerHTML = '';
	items.forEach(item => {
		list.insertAdjacentHTML('afterbegin', `<li>${item}</li>`);
	});
}

showList();
