// Loop is a sequence of instruction s that is continually repeated until a certain condition is reached


// For loop
for(let i = 0; i<=10; i=i+3){
    console.log(i)
}




function multiply (x = 1,y = 1,z = 1){
    console.log(x * y * z)
}



multiply(2,3)

console.log('-------------------')

/*
write a function called factor that takes two args and 
console.logs the factor of the first arg down to a max value of the second arg
e.g.
factor(2,8) //2,4,6,8
factor(3,20) //3,6,9,12,15,18

*/

// for(let i = 2; i <=8; i=i+2){
//     console.log(i)
// }

// console.log('-------------------')


// for(let i = 3; i <=20; i=i+3){
//     console.log(i)
// }


function factor(x,y){
    for(let i = x; i <=y; i= i+x){
        console.log(i)
    }
}


factor(3,20)
factor(5,50)

console.log('-------------------')

// Wrting a loop that counts down from 10 and stops at 0
for(let i = 10; i >= 0; i = i - 1){
    console.log(i)
}


/* write a function called countdown, that takes two args and counts down for the first arg down to 0 in a factor of the second arg

e.g. countdown(10, 2) // 10, 8, 6, 4, 2, 0.


*/

function countdown(x,y){
    for(let i = x; i >= 0; i = i - y){
        console.log(i)
    }
}
console.log('-------------------')

countdown(10,3)


console.log('-------------------w')

// while loop
let num = 0;

while(num < 10){
    console.log(num)
    num++
}

// write a while loop that logs 10 - 0
let numb = 10;

while(numb >=0){
    console.log(numb)
    numb--
}