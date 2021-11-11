const alert = document.querySelector('.alert');
const alertClose = document.querySelector('.alert-close');

// Event Listeners
alertClose.addEventListener('click', () => {
    alert.style.transform = 'translateX(-50%) translateY(300%)';
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        closeModal()
    }
})


function showAddMovieModal(){
    document.querySelector('body').insertAdjacentHTML('afterbegin',`
        <div class="modal admin show-modal">
        <div class="modal__container">
            <form class="add-movie__form" onsubmit ="addMovie(event)" >
                <div class="form-control">
                    <label for="title">Title</label>
                    <input type="text" id="title" placeholder="Whats the title for this movie?" required>
                </div>
                <div class="form-control">
                    <label for="img">img</label>
                    <input type="text" id="img" placeholder="Enter Image URL for img" required>
                    <button class="btn btn-primary" onclick="showMediaModal(event)">Upload Image</button>
                </div>
                <div class="form-control">
                    <label for="trailer">Trailer</label>
                    <input type="text" id="trailer" placeholder="Enter Youtube link for the movie Trailer" required>
                </div>
                <div class="form-control">
                    <label for="cost">Ticket Cost</label>
                    <input type="number" id="cost" placeholder="How much does the movie cost?" required>
                </div>
                 <div class="form-control">
                    <label for="cost">Tags</label>
                    <input type="text" id="tags" placeholder="Enter Tags for movie." required>
                    <small>Separate tags with a comma ( , ) e.g. horror,action,fantasy.</small>
                </div>
                <div class="form-control">
                    <label for="description">Description</label>
                    <textarea id="description" cols="30" rows="10" placeholder="Enter description for this movie" required></textarea>
                </div>
                
                <div class="form-control">
                    <button class="btn btn-grey btn-block">Add Movie</button>
                </div>
               
            </form>
        </div>

        <div class="modal__left--close" onclick="closeModal()">
                <i class="fa fa-times"></i>
        </div>
    </div>
    `)
}


function showMediaModal(e){
    e.preventDefault();
    document.querySelector('body').insertAdjacentHTML('beforeend',`
         <div class="modal uploads show-modal ">
        <div class="modal__container">
            <div class="uploads__left">
                <img src="./img/img-1.jpg" alt="">
                <img src="./img/img-2.jpg" alt="">
                <img src="./img/img-3.jpg" alt="">
                <img class="active" src="./img/img-4.jpg" alt="">
                <img src="./img/img-5.jpg" alt="">
                <img src="./img/img-6.jpg" alt="">
            </div>
            <div class="uploads__right">
                <form action="#" onsubmit="uploadImage(event)">
                    <div class="form-control">
                        <label for="title">Title</label>
                        <input type="text" id="imageTitle" value="" placeholder="Give image a title">
                    </div>
                    <div class="form-control">
                        <label for="alt">Alt</label>
                        <input type="text" id="imageAlt" value="" placeholder="Enter Alt Text">
                    </div>
                    <div class="form-control">
                        <label for="alt">Select Image</label>
                        <input type="file" id="imageFile" value="" placeholder="Choose Image">
                    </div>
                    
                    <button class="btn btn-primary">Upload New!</button>
                    
                </form>
            </div>
        </div>
        <div class="modal__left--close" onclick="closeModal()">
                <i class="fa fa-times"></i>
        </div>
    </div>
    `)
    console.log('you are about to upload an image')
}

function uploadImage(e){
    e.preventDefault();
    const imageTitle = document.querySelector('#imageTitle').value;
    const imageAlt = document.querySelector('#imageAlt').value;
    const imageFile = document.querySelector('#imageFile');
    const imageData = new FormData();
    imageData.append('image',imageFile.files[0])

    const imageInfo = {
        imageTitle,
        imageAlt,
        imageData
    }


    fetch('http://localhost:3000/upload',{
        method: 'POST',
        body: imageData
    })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))
}

function closeModal() {
    const modal = document.querySelector('.modal')
    if (modal) {
        document.querySelector('.modal').remove()
    }
}
//  So this is going great.

function addMovie(e){
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const trailer = document.querySelector('#trailer').value;
    const img = document.querySelector('#img').value;
    
    const tags = document.querySelector('#tags').value;
    const cost = document.querySelector('#cost').value;


    if(title == ''|| description == ''|| trailer== '' || img == ''|| tags == '' || cost == ''){
        showAlert('Please make sure all fields are filled')
    }else{

        // TODO Handle file upload

        let newMovieData = {
            title,
            description,
            trailer,
            img,
            tags:tags.split(','),
            cost
        }

        fetch('http://localhost:3000/add-movie',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newMovieData)
        })
        .then(response => {
            console.log(response)
            if(response.status === 201){
                closeModal();
                initApp();
                showAlert('Movie added successfully')

                return response.json()
            }
            else{
                showAlert('Something went wrong, Try again later.')
            }
        })
        .then(movie =>{
            console.log(movie)
        })
        .catch(err => {
            showAlert('Something went wrong')
            console.log(err)
        })

        console.log(newMovieData)
    }

}


function showAlert(message) {
    alert.querySelector('p').textContent = message;
    alert.style.transform = 'translateX(-50%)';

    setTimeout(() => {
        alert.style.transform = 'translateX(-50%) translateY(300%)'
    }, 4000)

}

function updateMovie(id){
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const trailer = document.querySelector('#trailer').value;
    const img = document.querySelector('#img').value;
    const tags = document.querySelector('#tags').value;
    const cost = document.querySelector('#cost').value;

     if (title == '' || description == '' || trailer == '' || img == '' || tags == '' || cost == '') {
         showAlert('Please make sure all fields are filled')
     } else {
         let newMovieData = {
             title,
             description,
             trailer,
             img,
             tags: tags.split(','),
             cost
         }

         fetch(`http://localhost:3000/update-movie/${id}`, {
             method: 'POST',
             headers:{
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(newMovieData)
         })
         .then(response => {
             if(response.status === 201){
                closeModal();
                initApp();
                showAlert('Movie Update successfully')
                return response.json()
            }
            else{
                showAlert('Something went wrong, Try again later.')
            }
        })
        .then(movie =>{
            console.log(movie)
        })
        .catch(err => {
            showAlert('Something went wrong')
            console.log(err)
        })
        }

}

function deleteMovie(id){
    let confirmDelete = confirm("Are you sure you want to delete this movie?")
    if(confirmDelete){
        fetch(`http://localhost:3000/delete-movie/${id}`,{
            method: 'POST'
        })
            .then(response => {
                closeModal();
                initApp();
                showAlert('Movie Deleted successfully')
            })
            .catch(err => {
                showAlert('Something went wrong, Could not delete')
            })
    }
    
}

function editMovie(id){
    closeModal();
    fetch(`http://localhost:3000/movie/${id}`)
    .then(response=>response.json())
    .then(movie =>{
        document.querySelector('body').insertAdjacentHTML('afterbegin',`
        <div class="modal admin show-modal">
        <div class="modal__container">
            <div class="add-movie__form"  >
                <div class="form-control">
                    <label for="title">Title</label>
                    <input type="text" id="title" value="${movie.title}" placeholder="Whats the title for this movie?">
                </div>
                <div class="form-control">
                    <label for="img">img</label>
                    <input type="text" id="img"value="${movie.img}" placeholder="Enter Image URL for img">
                </div>
                <div class="form-control">
                    <label for="trailer">Trailer</label>
                    <input type="text" value="${movie.trailer}" id="trailer" placeholder="Enter Youtube link for the movie Trailer">
                </div>
                <div class="form-control">
                    <label for="cost">Ticket Cost</label>
                    <input type="number" value="${movie.cost}"id="cost" placeholder="How much does the movie cost?">
                </div>
                 <div class="form-control">
                    <label for="cost">Tags</label>
                    <input type="text" id="tags" value="${movie.tags}" placeholder="Enter Tags for movie.">
                    <small>Separate tags with a comma ( , ) e.g. horror,action,fantasy.</small>
                </div>
                <div class="form-control">
                    <label for="description">Description</label>
                    <textarea id="description" cols="30" rows="10" placeholder="Enter description for this movie">${movie.description}</textarea>
                </div>
                
                <div class="form-control">
                    <button class="btn btn-grey " onclick="updateMovie('${movie._id}')">Update Movie</button>
                    <button class="btn btn-danger" onclick="deleteMovie('${movie._id}')">Delete Movie</button>
                </div>
               
            </div>
        </div>

        <div class="modal__left--close" onclick="closeModal()">
                <i class="fa fa-times"></i>
        </div>
    </div>
    `)
    })
    .catch(err => {
        showAlert('Something went wrong, Please Try again later.')
        console.log(err)
    })
}

function initApp() {

    const moviesWrapper = document.querySelector('#movieWrapper');
    moviesWrapper.innerHTML = ''

    fetch('http://localhost:3000/movies')
        .then(response => {
            return response.json();
        })
        .then(movies => {
            movies.forEach(movie => {
                moviesWrapper.insertAdjacentHTML('afterbegin', `
                   <img src="${movie.img}" alt="" onclick="editMovie('${movie._id}')">
                    `)
            });

            moviesWrapper.insertAdjacentHTML('beforeend', `
            <div class="add-movie" onclick="showAddMovieModal()" title="Add Movie">
                       <i class="fa fa-plus"></i>
            </div>`)

        })
        .catch(err => console.log(err))
}

