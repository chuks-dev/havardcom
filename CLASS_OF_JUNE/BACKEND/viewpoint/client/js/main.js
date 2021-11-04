// VARIABLES
const alert = document.querySelector('.alert');
const alertClose = document.querySelector('.alert-close');
const moviesWrapper = document.querySelector('.movies');
let MovieFromLocalStorage = localStorage.getItem('favMovies');
let favMovies = MovieFromLocalStorage && MovieFromLocalStorage != null ? JSON.parse(MovieFromLocalStorage) : [];



// EVENT LISTENERS

// closeModalShortCut
document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        closeModal()
    }
})


alertClose.addEventListener('click', () => {
    alert.style.transform = 'translateX(-50%) translateY(300%)';
});


// FUNCTION

function addMovieToFavourite(description, title, img, id) {
    let targetIcon = document.getElementById(id);

    //check if id already exits in favourite movies
    let isMovieExists = false;
    favMovies.forEach(favMovie => {
        if (favMovie.id === id) {
            isMovieExists = true;
        }
    })

    // add movie if isMovieExists is false
    if (!isMovieExists) {
        let newFav = {
            description,
            title,
            img,
            id
        }

        favMovies.push(newFav);
        localStorage.setItem('favMovies', JSON.stringify(favMovies))
        updateFavMoviesUI();
        showAlert('Movie Saved to favourite');

        //change icon from regular to solid
        targetIcon.classList.remove('far');
        targetIcon.classList.add('fa');

    } else {
        removeMovieFromFavourite(id)
    }

}

function removeMovieFromFavourite(id) {
    let targetIcon = document.getElementById(id);

    // if MovieExisit take movie away from array
    favMovies = favMovies.filter(movie => {
        return movie.id !== id; //this returns everthing except the item that has the current id
    })
    localStorage.setItem('favMovies', JSON.stringify(favMovies));
    updateFavMoviesUI();

    //change icon from solid to regular
    if (targetIcon && targetIcon != null) {
        targetIcon.classList.remove('fa');
        targetIcon.classList.add('far');
    }

    showAlert('Movie removed from favourite');

}

function updateFavMoviesUI() {
    const favMoviesContainer = document.querySelector('.fav-movies');
    favMoviesContainer.innerHTML = '';
    
    

    favMovies.forEach(movie => {
        favMoviesContainer.insertAdjacentHTML('afterbegin', `<div class="fav-movies__container">
            <div class="fav-movies__container--left">
                <img src=${movie.img} alt="image">
            </div>
            <div class="fav-movies__container--right">
                <h3>${movie.title}</h3>
                <p>
                    ${movie.description.substring(0,50)}...
                </p>
                <div class="fav-movies__container--right-btn">
                     <button class="btn btn-grey-outline" onclick="getTicket('${movie.id}')">Get Ticket</button>
                    <button  class="btn btn-danger" onclick="removeMovieFromFavourite('${movie.id}')" >
                        <i class="fa fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>`)

        
    })

    if (favMovies.length > 0) {
        favMoviesContainer.insertAdjacentHTML('beforeend', `
            <button class="btn btn-danger btn-danger-outline clear-fav" onclick="clearFavourites()">Clear All Favourites</button>
        `)
    }else{
        favMoviesContainer.insertAdjacentHTML('afterbegin',`
            <div class="fav-movies-default">
                <div class="circled-icon">
                <i class="fa fa-bookmark"></i>
                </div>
                <h3>Movies you saved for later will appear here.</h3>
            </div>
        `)
    }
    

}

function toggleFavMovies() {
    const favMovie = document.querySelector('.fav-movies');
    const navFav = document.querySelector('.nav__fav');
    favMovie.classList.toggle('show-fav-movies');

    if (favMovie.classList.contains('show-fav-movies')) {
        navFav.innerHTML = 'close Saved <i class="fa fa-bookmark"></i>';
    } else {
        navFav.innerHTML = ' <i class="fa fa-bookmark"></i> show Saved';
    }

}

function updateBookmarkIcons() {
    favMovies.forEach(favMovie => {
        let targetedElement = document.getElementById(favMovie.id);
        if (targetedElement && targetedElement != null) {
            targetedElement.classList.remove('far')
            targetedElement.classList.add('fa')
        }

    })
}

function clearFavourites(){
    let confirmRemoveFav = confirm("This is going to remove all your favourite movies");
    if (confirmRemoveFav) {
        favMovies = [];
        localStorage.setItem('favMovies', JSON.stringify(favMovies));
        updateFavMoviesUI();
        
        // remove bookmark from all bookmark icons
        moviesWrapper.querySelectorAll('.fa-bookmark').forEach(bookmarkIcon => {
            bookmarkIcon.classList.remove('fa')
            bookmarkIcon.classList.add('far')
        })

    }
}

function showModal(link, title, description, element, id, img) {
    closeModal()
    document.querySelector(element).insertAdjacentHTML('afterbegin', `
                <div class="modal">
                    <div class="modal__right">
                        <iframe width="840" height="480" src=${link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                        <div class="modal__left">
                            <h1>${title}</h1>
                            <p>
                                ${description}
                            </p>
                            <div>
                                <button class="btn btn-grey-outline" onclick="getTicket('${id}')">Get Ticket</button>
                                <button class = "btn btn-primary" onclick="addMovieToFavourite('${description.split("\n").join(' ').split("'").join(' ')}', '${title}','${img}', '${id}')" >
                                    <i class="far fa-bookmark"  id='${id}'></i>
                                </button>
                            </div>
                            <div class="modal__left--close" onclick="closeModal()">
                                <i class="fa fa-times"></i>
                            </div>
                        </div>
                </div>
                 `)
    document.querySelector('.modal').classList.add('show-modal');
    updateBookmarkIcons();
}

function closeModal() {
    const modal = document.querySelector('.modal')
    if (modal) {
        document.querySelector('.modal').remove()
    }
}

function showAlert(message) {
    alert.querySelector('p').textContent = message;
    alert.style.transform = 'translateX(-50%)';

    setTimeout(() => {
        alert.style.transform = 'translateX(-50%) translateY(300%)'
    }, 4000)

}

function getTicket(id) {
    closeModal();
    showLoader('Getting movie details')
    fetch(`http://localhost:3000/movie/${id}`)
        .then(response => {
            hideLoader()
            return response.json()
        })
        .then(movie => {
            document.querySelector('body').insertAdjacentHTML('afterbegin', `
        <div class="modal ticket show-modal">
            <div class="modal__ticket">
                <div class="modal__ticket--top">
                    <div class="modal__ticket--top-left">
                        <img src="${movie.img}" alt="">
                    </div>
                    <div class="modal__ticket--top-right">
                        <h1>${movie.title}</h1>
                        <p>${movie.description}</p>
                        <button class="btn btn-grey btn-grey-outline ">N${movie.cost} per ticket</button>
                    </div>
                </div>
                <div class="modal__ticket--bottom">
                    <form action="#" onsubmit="handleGetTicket(event, ${movie.cost}, '${movie._id}','${movie.title}')" class="modal--ticket--bottom-form">
                        <div class="form-control">
                            <label for="name">Name</label>
                            <input type="text" id="name" placeholder="Whats your name?" required>
                        </div>
                        <div class="form-control">
                            <label for="email">Email</label>
                            <input type="email" id="email" placeholder="Enter an email address" required>
                        </div>
                        <div class="form-flex">
                            <div class="form-control">
                                <label for="">How many tickets</label>
                                <input type="number" id="num-of-tickets" onchange="updateTotalCost(${movie.cost})" value="1" min="1" required>
                            </div>
                            <div class="form-control">
                                <label for="total">Total cost  </label>
                                <input class="btn btn-grey btn-lg" id="total-cost" value="${movie.cost}" disabled> 
                            </div>
                        </div>
                        <div class="fom-control">
                            <button class="btn btn-primary btn-block ">Make Payments</button>
                        </div>
                    </form>
                </div>
                <div class="modal__left--close" onclick="closeModal(${movie.cost})">
                    <i class="fa fa-times"></i>
                </div>
            </div>
        </div>
    `)
        })
        .catch(err => {
            hideLoader()
            showAlert('Something went wrong, please try again later')
            console.log(err)
        })
}

function updateTotalCost(price){
    const totalCost = document.querySelector('#total-cost');
    const numberOfTickets = Number(document.querySelector('#num-of-tickets').value);
    totalCost.value = price * numberOfTickets;
}

function handleGetTicket(e, cost, movieID, title) {
    e.preventDefault()
    showLoader('Initiating Payment')
    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const numOfTickets = Number(document.querySelector('#num-of-tickets').value);


    let ticketDetails = {
        name,
        email,
        numOfTickets,
        cost,
        movieID,
        title,
    }
    console.log(ticketDetails);

    fetch('http://localhost:3000/create-ticket', { 
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(ticketDetails)
    })
    .then(response => response.json())
    .then(transaction => {
        if(transaction.status === 'success'){
            window.location.replace(transaction.data.link);
            
        }
    })
    .catch(err => {
        hideLoader()
        showAlert('Something went wrong, Please try again')
        console.log(err)
    })
}


function showLoader (loaderMsg = 'loading'){
    document.querySelector('body').insertAdjacentHTML('beforeend',`
    <div div class = "loader show-loader" >
       <img src="./img/loader1.gif" alt="">
       <p>${loaderMsg}...</p>
    </div>
    `)
    
}
function hideLoader (){
    document.querySelector('.loader').remove()
}

function initApp() {

    showLoader()
    fetch('http://localhost:3000/movies')
        .then(response => {
            hideLoader()
            return response.json();
        })
        .then(movies => {
            movies.forEach(movie => {
                moviesWrapper.insertAdjacentHTML('afterbegin', `
                    <div class="movie__container">
                <div class="movie__container--thumbnail">
                    <img src=${movie.img} alt="image title">
                
                    <div class="movie__container--icon" onclick="showModal('${movie.trailer}', '${movie.title}','${movie.description.split("\n").join(' ').split("'").join(' ')}','main', '${movie._id}','${movie.img}')">
                    <i class="fa fa-play"></i>
                    </div>
                </div>
                <div class="movie__container--details">
                    <h1>${movie.title}</h1>
                    <p>
                       ${movie.description.substring(0,200)}...
                    </p>
                    <button class="btn btn-secondary" onclick="getTicket('${movie._id}')">Get Ticket</button>
                    <button class = "btn btn-primary"  onclick="addMovieToFavourite('${movie.description.split("\n").join(' ').split("'").join(' ')}', '${movie.title}','${movie.img}', '${movie._id}')" >
                        <i class="far fa-bookmark" id="${movie._id}"></i>
                    </button>
                </div>
            </div>
                    
                    `)
            });

            updateFavMoviesUI();
            updateBookmarkIcons();


        })
        .catch(err => console.log(err))
}


