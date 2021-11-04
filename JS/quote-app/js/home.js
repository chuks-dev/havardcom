const page = document.querySelector('#page');
// const quote = document.querySelector('#quote');
// const tags = document.querySelector('#tags');
// const author = document.querySelector('#author');
// const generateBtn = document.querySelector('#generate-btn');

window.addEventListener('load', () => {
  getQuote();
});

document.addEventListener('click', e => {
  console.log(e.target.id);
  if (e.target.id === 'generate-btn') {
    console.log('clicked');
    getQuote();
  }
});

function getQuote() {
  page.innerHTML = `<p>Fetching quotes...</p>`;

  fetch('https://quotes15.p.rapidapi.com/quotes/random/', {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '541873e11amsh0620d0a70c51742p121d7ejsne5b87455b029',
      'x-rapidapi-host': 'quotes15.p.rapidapi.com',
    },
  })
    .then(response => {
      return response.json();
    })
    .then(quotes => {
      console.log(quotes);
      page.innerHTML = '';
      page.insertAdjacentHTML(
        'afterbegin',
        `
      <div class="container">
            <blockquote id="quote">
                ${quotes.content}
            </blockquote>
            ${
              quotes.tags.length > 0
                ? `<p id="tags">${quotes.tags.join(', ')}</p>`
                : ''
            }
            <p id="author"> by ${quotes.originator.name}</p>

            <button id="generate-btn">Another Quote</button>
        </div>
      `,
      );
    })
    .catch(err => {
      console.error(err);
    });
}
