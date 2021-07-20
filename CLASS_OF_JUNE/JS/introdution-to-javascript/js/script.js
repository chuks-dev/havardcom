var x = 100;
var y = 50;

var firstName = 'Emmanuel';
var age = 15;

var isMarried = false;

console.log(x + y);
console.log(firstName);
console.log(isMarried);
console.log(x - y);
console.log(x * y);
console.log(x / y);
console.log(x % y);
console.log(5 % 3);

console.log('My name is ' + firstName + 'and I am ' + age + ' years old');

// Objects
var person = {
	firstName: 'Curtis',
	lastName: 'Jeff',
	age: 25,
	isMarried: false,
};
console.log(person.isMarried);

// Arrays
var fruits = ['mango', 'apple', 'orange', 'banana'];
console.log(fruits[3]);

console.log(typeof age);

firstName = 'James'; //mutation
var firstName = 'Andrew'; //Redeclaration
console.log(firstName);

// let and const keyword
let ourSchool = 'havardcom';
ourSchool = 'Discovery';

console.log(ourSchool);

const dateOfBirth = '12th May, 2005';

// Template literal
let person2 = {
	firstName: 'Emmanuel',
	lastName: 'Seyi',
	age: 24,
	isMarried: true,
};

console.log(
	`My name is ${person2.firstName} and i am ${person2.age} years old`,
);
