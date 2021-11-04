const input = document.querySelector('#input');
const newCase = document.querySelector('#case');
const output = document.querySelector('#output');

input.addEventListener('keyup', checkCase);
newCase.addEventListener('change', checkCase);

// Functions
function checkCase() {
  if (newCase.value === 'uppercase') {
    output.textContent = input.value.toUpperCase();
  } else if (newCase.value === 'lowercase') {
    output.textContent = input.value.toLowerCase();
  } else if (newCase.value === 'kebab-case') {
    output.textContent = changeCase(input.value, '-');
  } else if (newCase.value === 'snake_case') {
    output.textContent = changeCase(input.value, '_');
  } else if (newCase.value === 'camelCase') {
    output.textContent = convertToCamelCase(input.value);
  } else {
    output.textContent = input.value;
  }
}

function changeCase(str, symb) {
  return str.toLowerCase().split(' ').join(symb);
}

// function convertToCamelCase(str) {
//   let strArr = str.split(' ');
//   let words = [];

//   for (let i = 0; i < strArr.length; i++) {
//     let ulteredWord =
//       strArr[i][0].toUpperCase() +
//       strArr[i].slice(1, strArr[i].length).toLowerCase();
//     words.push(ulteredWord);
//   }

//   words = words.join('');
//   words = words[0].toLowerCase() + words.slice(1, words.length);
//   return words;
// }

function convertToCamelCase(str) {
  let strArr = str.split(' ');
  let words = [];
  for (let i = 0; i < strArr.length; i++) {
    let ulterdWord =
      strArr[i][0].toUpperCase() +
      strArr[i].slice(1, strArr[i].length).toLowerCase();
    words.push(ulterdWord);
  }

  words = words.join('');
  words = words[0].toLowerCase() + words.slice(1, words.length);
  return words;
}

console.log(convertToCamelCase('Free code Camp')); //freeCodeCamp
