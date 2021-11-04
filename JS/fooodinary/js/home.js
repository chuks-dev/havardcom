const body = document.querySelector('body');
const pageCards = document.querySelector('#page-cards');
const middlePage = document.querySelector('#middle-page');
const term = document.querySelector('#search-term');
const searchForm = document.querySelector('#search-form');
const autoSuggestions = document.querySelector('#autoSuggestions');
const editor = document.querySelector('#editor');
const sidebarCards = document.querySelector('#sidebar-cards');
const tags = document.querySelectorAll('.tags');
const favouriteFromLocalStorage = JSON.parse(localStorage.getItem('favourite'));

const favourite =
  favouriteFromLocalStorage !== null ? favouriteFromLocalStorage : [];

const API_HEADER = {
  'x-rapidapi-key': 'd24db66eedmsh83aa91faddb1f9bp192fd4jsn8220a148e2ea',
  'x-rapidapi-host': 'tasty.p.rapidapi.com',
};

// INITIALIZE QUILL
// const quill = new Quill('#editor', {
//   modules: {
//     toolbar: [
//       [{ header: [1, 2, false] }],
//       ['bold', 'italic', 'underline'],
//       ['image', 'code-block'],
//     ],
//   },
//   placeholder: 'Keep your notes here...',
//   theme: 'snow',
// });

// EVENT LISTENERS
window.addEventListener('load', () => {
  const note = localStorage.getItem('note');
  fetchMeals();
  showFavourite();
  if (note !== null) {
    editor.value = note;
  }
});

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  fetchMeals(term.value);
});

term.addEventListener('keyup', e => {
  // fetchSuggestions();
});

tags.forEach(tag => {
  tag.addEventListener('click', e => {
    fetchMeals(term.value, e.target.id);
  });
});

editor.addEventListener('keyup', e => {
  localStorage.setItem('note', e.target.value);
});

//FUNCTIONS
function fetchMeals(
  query = '',
  tag = 'under_30_minutes',
  isVegetarian = 'false',
) {
  showLoader();
  fetch(
    `https://tasty.p.rapidapi.com/recipes/list?q=${query}&from=0&size=10&tags=${tag}&vegetarian=${isVegetarian}`,
    {
      method: 'GET',
      headers: API_HEADER,
    },
  )
    .then(response => {
      return response.json();
    })
    .then(meals => {
      pageCards.innerHTML = '';
      showResults(meals.results);
    })
    .catch(err => {
      showAlert('Something went wrong', 'danger');
      console.error(err);
    });
}

function showLoader() {
  pageCards.innerHTML = '';
  pageCards.insertAdjacentHTML(
    'afterbegin',
    `
  <div class="d-flex justify-content-center mt-5">
      <div class="spinner-border  text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
      </div>
  </div>
  `,
  );
}

function fetchSuggestions() {
  fetch(
    `https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=${term.value}`,
    {
      method: 'GET',
      headers: API_HEADER,
    },
  )
    .then(response => {
      return response.json();
    })
    .then(suggestions => {
      // suggestions.results.innerHTML = '';
      suggestions.results.slice(0, 5).forEach(suggestion => {
        autoSuggestions.insertAdjacentHTML(
          'afterbegin',
          `
        <option value="${suggestion.search_value}"></option>
        `,
        );
      });
    })
    .catch(err => {
      showAlert('Something went wrong', 'danger');
      console.log(err);
    });
}

function showResults(arr) {
  if (arr.length < 1) {
    showAlert('Sorry, Nothing found', 'info');
  } else {
    arr.forEach(meal => {
      pageCards.insertAdjacentHTML(
        'afterbegin',
        `
        <div class="col-lg-6">
              <div class="card p-2" style="width: 15rem;">
                  <img src=${meal.thumbnail_url} class="card-img-top" alt="...">
                  <div class="card-body">
                      <h5 class="card-title">${meal.name}</h5>
                      <p class="card-text">${
                        meal.description
                          ? meal.description.substring(0, 50) + ' ...'
                          : ''
                      }</p>
                      
                      <div class="d-flex justify-content-between align-items-center">
                          <a href="#" class="btn btn-primary" onclick='getSingleRecipe(${
                            meal.id
                          })' >Get Recipe</a>

                          <i class="card-fav far fa-heart" onclick='addToFavourite(${
                            meal.id
                          })'></i>
                      </div>
                  </div>
              </div>
          </div>
        `,
      );
    });
  }
}

function getSingleRecipe(id) {
  showLoader();
  fetch(`https://tasty.p.rapidapi.com/recipes/detail?id=${id}`, {
    method: 'GET',
    headers: API_HEADER,
  })
    .then(response => {
      return response.json();
    })
    .then(recipe => {
      console.log(recipe);
      showSingleRecipe(recipe);
    })
    .catch(err => {
      showAlert('Something went wrong', 'danger');
      console.error(err);
    });
}

function showSingleRecipe(recipe) {
  pageCards.innerHTML = '';
  pageCards.insertAdjacentHTML(
    'afterbegin',
    `
  <div class="col-11 recipe mx-auto">

    <div class="recipe__top border-bottom mb-3">
        <img src=${recipe.thumbnail_url} class="img-fluid mb-3 " alt="...">
        <div class="d-flex justify-content-between align-items-center">
            <h3>${recipe.name}</h3>
            <p> <i class="far fa-clock"></i> ${
              recipe.total_time_tier
                ? recipe.total_time_tier.display_tier
                : 'unavailable'
            }</p>
        </div>
    </div>

    <div class="row recipe__bottom">
        
        <div class="col-md-11 recipe__bottom--steps">
            <h4 class="mb-3">Steps</h4>
            <ul id="recipe-steps">
            ${renderLists(recipe.instructions)}
            </ul>
        </div>
    </div>

  </div>`,
  );
}

function renderLists(lists) {
  const listItem = lists.map(list => {
    // console.log(list.display_text);
    return `<li class="mb-4">${list.display_text}<li>`;
  });
  return listItem.join('');
}

function showAlert(error, type) {
  pageCards.innerHTML = '';
  pageCards.insertAdjacentHTML(
    'afterbegin',
    `
  <div class="alert alert-${type}" role="alert">
  ${error}
</div>`,
  );
}

function getVegetarian() {
  fetchMeals(term.value, '', true);
}

function addToFavourite(id) {
  body.classList.add('fade-out');
  fetch(`https://tasty.p.rapidapi.com/recipes/detail?id=${id}`, {
    method: 'GET',
    headers: API_HEADER,
  })
    .then(response => {
      return response.json();
    })
    .then(recipe => {
      console.log(recipe);
      body.classList.remove('fade-out');

      const { thumbnail_url, name, id } = recipe; //destructuring
      let fav = {
        thumbnail_url,
        name,
        id,
      };
      favourite.push(fav);
      localStorage.setItem('favourite', JSON.stringify(favourite));
      showFavourite();
    })
    .catch(err => {
      body.classList.remove('fade-out');

      showAlert('Something went wrong', 'danger');
      console.error(err);
    });
}

function showFavourite() {
  if (favourite.length > 0) {
    sidebarCards.innerHTML = '';
    favourite.forEach(fav => {
      sidebarCards.insertAdjacentHTML(
        'afterbegin',
        `
      <div class="col-12">
        <div class="sidebar__card p-2 d-flex justify-content-center align-items-center" onclick = 'getSingleRecipe(${fav.id})';>
            <div class="d-flex ">
                <img src=${fav.thumbnail_url} alt="" class="me-3">
                <div class="sidebar__card--content">
                    <h6>${fav.name}</h6>
                </div>
                <i class="fa fa-times sidebar__card--close" onclick='deleteFromFavourite(${fav.id})'></i>
            </div>
        </div>
      </div>
      `,
      );
    });
  }
}

function deleteFromFavourite(id) {
  const index = favourite.findIndex(fav => fav.id == id);
  favourite.splice(index, 1);
  localStorage.setItem('favourite', JSON.stringify(favourite));
  showFavourite();
}

function toggleDarkMode() {
  console.log('clicked');
  body.classList.toggle('dark-mode');
  middlePage.classList.toggle('dark-mode');
}

function clearData() {
  localStorage.clear();
  showFavourite();
}
