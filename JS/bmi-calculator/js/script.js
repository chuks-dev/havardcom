const weight = document.querySelector('#weight');
const height = document.querySelector('#height');
const submit = document.querySelector('#submit');
const result = document.querySelector('#result');

submit.addEventListener('click', function () {
  const bmi =
    Number(weight.value) / (Number(height.value) * Number(height.value));

  result.textContent = bmi;
});
