const page = document.querySelector('#page');
const searchForm = document.querySelector('#search-form');
const term = document.querySelector('#search-input');

// EVENT LISTENERS
searchForm.addEventListener('submit', e => {
  // Prevent page from reloading
  e.preventDefault();

  showLoader();

  fetchSongs();
});

//open all achors in a new browsers tab
document.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    e.target.target = '_blank';
  }
});

// FUNCTION
function showLoader() {
  //   Clear page content
  page.innerHTML = '';

  //   Show loader
  page.insertAdjacentHTML(
    'afterbegin',
    `
  <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
  `,
  );
}

function fetchSongs() {
  // fetch post
  fetch(`https://genius.p.rapidapi.com/search?q=${term.value}`, {
    headers: {
      'x-rapidapi-key': '541873e11amsh0620d0a70c51742p121d7ejsne5b87455b029',
      'x-rapidapi-host': 'genius.p.rapidapi.com',
    },
  })
    .then(response => {
      return response.json();
    })
    .then(songs => {
      console.log(songs.response.hits);
      showResult(songs.response.hits);
    })
    .catch(error => {
      showError();
    });
}

function showResult(hits) {
  page.innerHTML = '';

  hits.forEach(hit => {
    let hitInfo = hit.result;
    page.insertAdjacentHTML(
      'beforeend',
      renderResult(
        hitInfo.header_image_thumbnail_url,
        hitInfo.title_with_featured,
        hitInfo.primary_artist.name,
        hitInfo.api_path,
      ),
    );
  });
}

function renderResult(image, title, artist, api_path) {
  return `

            <div class="card mb-3 mx-auto" style="max-width: 540px; cursor:pointer;" onclick="renderLyrics('${api_path}')" >
                <div class="row g-0">
                    <div class="col-md-4 overflow-hidden ">
                        <img src=${image}
                            style="width: 100%;" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text"><small class="text-muted">By ${artist}</small></p>
                        </div>
                    </div>
                </div>
            </div>

`;
}

function renderLyrics(api_path) {
  showLoader();

  // Fetch song lyrics
  fetch(`https://genius.p.rapidapi.com${api_path}`, {
    headers: {
      'x-rapidapi-key': '541873e11amsh0620d0a70c51742p121d7ejsne5b87455b029',
      'x-rapidapi-host': 'genius.p.rapidapi.com',
    },
  })
    .then(response => {
      return response.json();
    })
    .then(result => {
      page.innerHTML = '';
      page.insertAdjacentHTML('afterbegin', result.response.song.embed_content);
    })
    .catch(err => {
      showError();
    });
}

function showError() {
  page.innerHTML = '';
  page.insertAdjacentHTML(
    'afterbegin',
    `
        <div class="alert alert-danger">
        <h2>Something went Wrong</h2>
        <hr>
        There was a problem getting your lyrics! Try again later.
        </div>
      `,
  );
}
