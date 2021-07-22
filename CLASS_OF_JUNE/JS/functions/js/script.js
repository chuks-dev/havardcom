function getSquare(x) {
	console.log(x * x);
}

getSquare(13);
getSquare(69);
getSquare(8);

function greet(person = 'World') {
	//console.log('Hello world ' + person); //concatanation
	console.log(`Hello ${person}`); //template literal
}

greet('Peter');

// Gets a persons age through year of birth
function getAge(year) {
	console.log(`You are ${2021 - year} year(s) old`);
}

getAge(1989);

// Write a function that takes a year of birth as an argument and logs the generation depending of the year specified
// eg. getGen(1955) ==> You are a Baby Bommer
