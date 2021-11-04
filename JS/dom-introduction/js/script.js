// DOM MANIPULATION

//Selecting element in the dom


// Selecting elements by their tag names
document.getElementsByTagName('button');

// selecting elements by Id
document.getElementById('mybtn');

// Selecting elements by class names
document.getElementsByClassName('ourbtn')


const ourBtn =  document.querySelector('.ourbtn');
const myBtn =  document.querySelector('#mybtn');
const button = document.querySelectorAll('button');

console.log(myBtn.textContent);
// console.log(button.textContent);

myBtn.textContent = "Apple";



// console.log('-------------')
// for(let i = 0; i < button.length; i++){
//     console.log(button[i].textContent)
// }


// inputs and value
const fname = document.querySelector('#fname');
const lname = document.querySelector('#lname');
const submitBtn = document.querySelector('#submit')
const result = document.querySelector('#result')

// Event Listeners

// function clicker (){
//     result.textContent = 'His names are ' + fname.value + ' ' +lname.value
// }   //Function Declaration

submitBtn.addEventListener('click', function (){
     result.textContent = 'His names are ' + fname.value + ' ' +lname.value
    //  function expression or anonymous function
})


// converting string to number
let numString = '55';
let num = 22;


numString = Number(numString) //String converted to number
