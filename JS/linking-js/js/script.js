// variables = placeholder used to store data-types


// declaring variables 
var mynumber = 5;
var myletter = 'E';


// data-types = a particular kind of data item, as defined by the values it can take
/*
number = Arbitrary numbers = 1,2,55,108,5000 and NaN
strings = usually wrapped in in quotes(single or double), they can be alphabetical, alphanumeric, alphabets and symbols.
booleans = true or false values
objects = written in opening and closing curly braces,they store key and value pairs {key:value} separted by a column,and each pair is separted by a comma
null
undefined
BigInt

*/

var x = 5;
var y = 10;
var fname = "Emmanuel";
var lname = 'Chuks';
var age = 10;
var isMarried = false;
var isTall = true;

console.log(x)
console.log(y)
console.log(fname)
console.log(lname)
console.log(isMarried)


// Operators in javscript = An operator performs some operation on single or multiple operands (data value) and produces a result

/*
    Examples of operators
    +, -, *, /, %, **, ++, --
*/

console.log(1+2)
console.log(5-1)
console.log(5*5)
console.log(24/3)
console.log(26%3)

console.log(x+y)
console.log(age-x)
console.log(fname * age)


// concatation = is the operation of joining character strings end-to-end


console.log("Hello is name is " + fname + " I am " + age + " years old");

// Objects
var victor = {
    firstName :"Stephen",
    lastName:"Victor",
    age:25,
    isMarried:false,
    isTall:true
}


console.log("Hi my name is " + victor.firstName + " my last name is " + victor.lastName + " and I am "+ victor.age + " years old")

// varible mutation = re-assiging a new value to an already declared variable
var fname = "Promise"; //note that fname had already been declared
console.log(fname) //output == Promise



//CONST AND LET

let myName = "Chuks Emmanuel";
myName = "Chuks Victor" //variable mutation

console.log(myName);

const myAge = 55;
console.log(myAge)


let username;

username = "chuksdev";

console.log(username)



// The difference btw const and let is that, the former is immutable while the latter is mutable


// Template literal
const ese = {
    fname:"Eseoghene",
    lname:"Simon",
    age:12,
    isMarried:false,
    isTall:true
};


console.log("My name is "+ese.fname + ", My last name is " + ese.lname + ", and I am " + ese.age + " years old." + " \" Life is short \" ");



// Template literal
console.log(`my name is ${ese.fname}, my last name is ${ese.lname}, and I am ${ese.age} years old. "Life is short"`)


// casing
let MYCHURCH = "REDEEMED"  // uppercase
let myhouse = "Progress House"  //lower case
let mySchool = "Havardcom" //Camel case  (recommeneded)
let my_wife_name = "jennifer" //Snake case
// let my-best-friend = "Promise" //Kabab
let MyOldFriend = "Victor" //Pascal



// Logical operator: are used to determine the logic between variables or values.

/*
== equality operator
=== strict equality operator
! not operator
!= not equality operator
!== strict not equality operator
&& and operator
|| or operator
> greater than operator
< lesser than operator
>= operator
<= operator
*/

let w = 5;
let a = 1;
let v = "5";
let z = 1;


console.log(w == a)
console.log(w != a)
console.log(v == w)
console.log(v === w)
console.log(w != v)
console.log(w !== v)
console.log(w > z)
console.log(a >= z)


console.log(w === v && a ==z)
console.log(a === v || w ==v)

console.log(!(w > a));

console.log(!(w === v))

console.log(w >= v)


// If statement
/* if(condition goes here){
    ...code goes here
 } */

 if(w > z){
     console.log("yehh, W wins")
 }else{
     console.log("Awwn, Z wins")
 }

 if(w > v){
     console.log("W is the boss")
 }else if(w> z){
    console.log("W still the boss")
 }else{
     console.log("poor W")
 }



// check for even numbers

console.log('----------------------------')

let num = 30;

// check for even number
if(num%2 === 0){
    console.log(`${num} is an even number`)
}

if(num % 5 === 0){
    console.log(`${num} is a factor of 5`)
}

if(num % 3 === 0){
    console.log(`${num} is a factor of 3`)
}

if(num % 2 === 0 && num % 3 === 0 && num % 5 === 0 ){
    console.log(`${num} is the magic number`)
}


