// for loop
// for(var i = 0; i < 10; i++){
//     console.log(i)
// }



// while loop

// var i = 0;

// while (i < 10){
//     console.log(i);
//     i++
// }


// Looping trhrough an array

// var names = ["Sam","Cat","Fred","Dawn","Nicky", "Dicky","Ricky"];



// for(var i = 0; i < names.length; i++){
//     console.log(names[i])
// }



// var myNums = [1,9,15,25,3];

// var sum = 0;
// for(var i =0; i < myNums.length; i++){
//     sum = sum + myNums[i];
// }
// console.log(sum)


// var scores =[56.9,22.4,99,17.55,9,255];

// var highestScores = scores[0];

// for(var i = 0; i < scores.length; i++){
    
//     if(scores[i] < highestScores){
//         highestScores = scores[i]; 
//     }
// }

// console.log(highestScores)



var namesOfStudent = ["Chukwunweike","James","Promise","John","Peter","Oghenetega"]

var longestName=""


for(var i = 0; i < namesOfStudent.length; i++){
   if(namesOfStudent[i].length > longestName.length){
       longestName = namesOfStudent[i];
   }
}


console.log(longestName)