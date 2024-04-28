const key = '992dba73';



var searchInput = document.getElementById('searched-item');

searchInput.addEventListener('input', () => {
    //console.log(searchInput.value);
    getMovieInfo((searchInput.value).trim());

});

async function getMovieInfo(searchedMovie){ 

    const URL = `https://omdbapi.com/?s=${searchedMovie}&page=1&apikey=${key}`;
    const res = await fetch(`${URL}`);
    const data = await res.json();

    //console.log(data.Search);
    if(data.Response == "True") 
    {
        displaySmallMovie(data.Search);
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
        <img src=${data.Poster} alt="${data.Title}">
        <h1>${data.Title}</h1>
        <h2>Year: ${data.Year}</h2>
        <p>Released: ${data.Released}</p>
        <p>Genre: ${data.Genre}</p>
        <p>Director: ${data.Director}</p>
        <p>Actors: ${data.Actors}</p>
        <p>Plot: ${data.Plot}</p>
        <p>BoxOffice: ${data.BoxOffice}</p>
        <p>imdbRating: ${data.imdbRating}</p>
        <p>imdbVotes: ${data.imdbVotes}</p>
        <p>Awards: ${data.Awards}</p>
        `;
        
        document.querySelector('.mainMovieDetails').innerHTML=content;
        
}









