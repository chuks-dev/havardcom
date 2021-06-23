let num = 5;

// check for even number
if(num%2 === 0){
    console.log(num + " is an even number")
}else if(num %3 === 0){
    console.log(num + " is a factor of 3")
}
else{
    console.log(`${num} is not an even number or a factor of 3`)
}


// SWITCH STATEMENT


/*
Baby booomers = 1946 - 1964
Gen X = 1965 - 1980
Millennials = 1981 -1996
Gen Z = 1997 - 2010
Gen Alpha = 2010
*/


// if(DOB >= 1946 && DOB <= 1964){
//     console.log("Hey you are a BOomer")
// }else if(DOB >=1965 && DOB <= 1980){
//     console.log("You are a X")
// }else if(DOB >= 1981 && DOB <= 1996){
//     console.log("You are a Millennial")
// }else if(DOB >= 1997 && DOB <= 2010){
//     console.log("You are a Z")
// }else if(DOB >=2010){
//     console.log("you are an Alpha")
// }else{
//     console.log("you are really Old")
// }

let DOB = 1955;


switch(true){
    case DOB >= 1946 && DOB <= 1964:
        console.log("Hey you are a BOomer");
        break;
    case DOB >=1965 && DOB <= 1980:
        console.log("You are a X");
        break;
    case DOB >= 1981 && DOB <= 1996:
        console.log("You are a Millennial");
        break;
    case DOB >= 1997 && DOB <= 2010:
        console.log("You are a Z");
        break;
    case DOB >=2010:
        console.log("you are an Alpha");
        break;
    default:
        console.log("you are really Old");
}

num = 4


// if(num === 1){
//     console.log("One")
// }else if(num === 2){
//     console.log("Two")
// }else if(num === 3){
//     console.log("Three")
// }else{
//     console.log("I can't spell that number")
// }


switch (num){
    case 1:
        console.log("One");
        break;
    case 2:
        console.log("Two");
        break;
    case 3:
        console.log("Three");
        break;
    default:
        console.log("I can't spell that number")
}

// if statement
let fname = "Emmanuel";
//  if(fname === "Emmanuel"){
//      console.log("Welcome Back Emmanuel")
//  }else{
//      console.log(`You are ${fname} not Emmanuel`)
//  }

// Tenary Operator
fname === "Emmanuel" ? console.log("Welcome Back Emmanuel"):console.log(`You are ${fname} not Emmanuel`);


let age  = 14;

age >= 18 ? console.log("You are old enough"):console.log(`come back in ${18 - age } year(s) time`)



/*if age is equal to or above 18 = You are old enough
if age is less that 18 , come back in __ year(s) time */


