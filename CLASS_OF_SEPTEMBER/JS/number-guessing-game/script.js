var guessedNumber = generateRandomNumber();
var minValue = guessedNumber - Math.floor(Math.random() * 20);
var maxValue = guessedNumber + Math.floor(Math.random() * 20);

var guessCount = 0;



initApp()





function initApp() {
	var userNumber = prompt('Guess a number from ' +minValue + ' to ' +maxValue + ' (You have guessed ' + guessCount + ' times)');
	evaluateGuess(userNumber);
}

function evaluateGuess (userNumber){
    if (userNumber == guessedNumber) {
			document.write('<h3>Congratulations your guess was correct, that took you ' + guessCount + ' guesses </h3>');
		} else if (userNumber < minValue || userNumber > maxValue) {
            alert('The number must be between ' + minValue + ' and ' + maxValue);
            initApp();
		} else {
			alert('That was wrong, click "Ok" to try again');
			guessCount = guessCount + 1;
			initApp();
		}
}

function generateRandomNumber (){
    var randNum = Math.floor(Math.random() *100);
   return randNum
}