const key = '992dba73';

var searchInput = document.getElementById('searched-item');



searchInput.addEventListener('input', () => {
    let genreFilter = document.getElementById('genre-filter').value;
    console.log(genreFilter);
    getMovieInfo((searchInput.value).trim(), genreFilter);
});


var genreFilterDropdown = document.getElementById('genre-filter');

genreFilterDropdown.addEventListener('change', () => {
    let genreFilter = genreFilterDropdown.value;
    console.log(genreFilter);
    getMovieInfo((searchInput.value).trim(), genreFilter);
});



async function getMovieInfo(searchedMovie, genreFilter){ 

    const URL = `https://omdbapi.com/?s=${searchedMovie}&page=1&apikey=${key}`;
    const res = await fetch(`${URL}`);
    const data = await res.json();

    if(data.Response == "True") 
    {
        if(genreFilter == "All"){
            displaySmallMovie(data.Search);
        }
        else{
            displaySmallMoviewithGenre(data.Search, genreFilter);
        }
        
    }
}




async function displaySmallMovie(allMovies){
    
    var content = '';

    for(let i = 0; i < allMovies.length; i++)
    {
        if(allMovies[i].Poster == "N/A"){
            allMovies[i].Poster = "./no-poster-found-img.png";
        }
        id = allMovies[i].imdbID;
        content += `
        <a href = "maindetails.html?id=${id}">
        <div class = "brief-info">
            <img src = ${(allMovies[i]).Poster} alt = "${(allMovies[i]).Title}"> 
            <div class = "brief-movie-title">
                <h1 class = "brief-info-title">${(allMovies[i]).Title}</h1>
            </div>
            <h3 class = "brief-info-h3">${(allMovies[i]).Year}</h3>
        </div>
        </a>
        `;
    } 
    document.querySelector('.movie-brief').innerHTML = content;

}


async function displaySmallMoviewithGenre(allMovies,genreFilter){
    
    var content = '';

    for(let i = 0; i < allMovies.length; i++)
    {
        if(allMovies[i].Poster == "N/A"){
            allMovies[i].Poster = "./no-poster-found-img.png";
        }
        id = allMovies[i].imdbID;

        const URL = `https://omdbapi.com/?i=${id}&apikey=${key}`;
        const res = await fetch(URL);
        const data = await res.json();


        // console.log(data.Genre.split(','));
        // console.log(genreFilter);

        if((data.Genre.split(',')).map(s => s.trim()).includes(genreFilter)){
            console.log("Genre Matched");

            content += `
            <a href = "maindetails.html?id=${id}">
            <div class = "brief-info">
                <img src = ${(allMovies[i]).Poster} alt = "${(allMovies[i]).Title}"> 
                <div class = "brief-movie-title">
                    <h1 class = "brief-info-title">${(allMovies[i]).Title}</h1>
                </div>
                <h3 class = "brief-info-h3">${(allMovies[i]).Year}</h3>
            </div>
            </a>`;
        }
    }

    document.querySelector('.movie-brief').innerHTML = content;
}


//next step is to get the details of the movie when the user clicks on the movie poster or title as based on what they have searched
async function getMovieDetails(){
        // Get the URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        
        // Extract the 'id' parameter from the URL
        const id = urlParams.get('id');

        
        const URL = `https://omdbapi.com/?i=${id}&apikey=${key}`;
        const res = await fetch(URL);
        const data = await res.json();

        console.log(data.Title);

        // let ratingnumber = data.Ratings.length;
        // for(let i = 0; i < ratingnumber; i++){
            
        // }
        //each of the rating can be taken into consideration that is it will give us different data sets which could be later used in order to generate a chart using chart js


        if(data.Poster == "N/A"){
            data.Poster = "./poster-not-found.jpg";
        }

        
        var content = `
        <div class="image">
        <img src=${data.Poster} alt="${data.Title}" >
     </div>
     <div class="info">
     <h1 id="title">${data.Title}</h1>
     <h3 ><span>Year : </span>  ${data.Year}</h3>
     <p ><span>Released : </span>  ${data.Released}</p>
     <p ><span>Genre : </span>  ${data.Genre}</p>
     <p ><span>Director : </span>  ${data.Director}</p>
     <p ><span>Actors : </span>  ${data.Actors}</p>
     <p><span>BoxOffice : </span>  ${data.BoxOffice}</p>
     <p><span>imdbRating : </span>  ${data.imdbRating}</p>
     <p><span>imdbVotes : </span>  ${data.imdbVotes}</p>
     <p><span>Awards : </span>  ${data.Awards}</p>
     <p id="plot"><span>Plot : </span>  ${data.Plot}</p>
     </div>
        `;
        
        document.querySelector('.mainMovieDetails').innerHTML=content;
        
}








