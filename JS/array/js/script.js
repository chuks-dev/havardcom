// Array - In JavaScript, an array is an ordered list of values that holds different data types enclosed in a bracket and separated by commas. Each value is called an element specified by an index.

// Arrays starts from 0

let numbs = [1, 2, 3, 5]; //array of numbers
let names = ['Ese', 'Emmanuel', 'Victor', 'Promise']; //array of strings

let allThings = [
  55,
  'Ese',
  { brand: 'Toyota', color: 'Black', model: 'Corolla' },
  true,
  null,
];

console.log(numbs);
console.log(names);
console.log(allThings);

console.log('-------------');

// Array methods
//getting the length of an array
console.log(allThings.length);

// getting an element from an array using the bracket notation
console.log(names[2]);

console.log('-------------');
console.log(allThings[2].model);

const Emmanuel = {
  fname: 'Chuks',
  lname: 'Emmanuel',
  age: '13',
  height: "5'5",
  hobby: 'reading',
};
console.log('---------------------------');

let fruit = [
  'Apple',
  'Mango',
  'Grape',
  'Orange',
  'Banana',
  'Cherry',
  'Water Melon',
  'Coconut',
];

// Mutating the value of an element in an array
fruit[2] = 'Guava';

// Adding element to the ending of an array
fruit.push('Pineapple');

// Removing last element of an array
fruit.pop();

// Adding element to the beginning of an array
fruit.unshift('Pineapple');

// Remove element from the beginning of an array
fruit.shift();

// Getting the length of an array
console.log(fruit.length);

console.log('---------------------------');

// LOOPING ARRAYS
for (let i = 0; i < fruit.length; i++) {
  console.log(fruit[i]);
}

/* Create a function called doubleArr that takes an arr of numbers as an arg and console.logs twice each number in the arr
eg.
doubleArr([2,3,5,4]) // 4,6,10,8
doubleArr([9,15,50,41]) // 18,30,100,82

*/
function doubleArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i] * 2);
  }
}

doubleArr([2, 3, 5, 4]);
doubleArr([9, 15, 50, 41]);

// SPlit join Array methods

const myString = 'Hello world';
const ourNames = 'Ese,Emmanuel,Victor,Promise';
const fruits = 'Mango|Apple|Orange';

console.log(myString.split(' '));
console.log(ourNames.split(','));
console.log(fruits.split('|'));

const myArr = [1, 2, 3, 4];

console.log(myArr.join());

const myOtherString = 'H  e p';
console.log(myOtherString.split(' ').join('').length);
