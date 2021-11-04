//* VARIABLES IN ES6

let x = 6; //declaration
// console.log(x);
x = 7; //mutation
// console.log(x);

const y = 8;
// console.log(y);
// y = 9; can't be redeclared

/**
 * Let can be mutated, while const can't. (NOTE: none can be redeclared)
 *
 */

//* FUNCTIONS
//function declaration in ES5
function add(x, y) {
  return x + y;
}

console.log(add(x, y));

//function expression in ES5
document.querySelector('h1').addEventListener('click', function (e) {
  //   e.target.classList.add('dark');
  //   e.target.classList.remove('me');
  e.target.classList.toggle('dark');
});

//function declaration in ES6 aka arrow function
const multiply = (x, y) => {
  return x * y;
};

//function expression in ES6
document.querySelector('.me').addEventListener('click', e => {
  e.target.classList.toggle('purple');
});

//* LOOPS AND ARRARY METHODS
let fruits = ['Mango', 'Banana', 'Orange', 'Pear', 'Cherry', 'Apple'];

// Looping through an array using the for loop = ES5
for (let i = 0; i < fruits.length; i++) {
  //   console.log(fruits[i].toUpperCase());
}

// ForEach ES6
let upperFruit = [];

// for each
fruits.forEach(fruit => {
  upperFruit.push(fruit.toUpperCase());
});

const lowerFruits = fruits.map(fruit => {
  return fruit.toLowerCase();
});

console.log(upperFruit);
console.log(lowerFruits);
