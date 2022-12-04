// lets store api urls in  variables for easy use.

const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


    const moiveBox = document.querySelector("#movie-box")
    const getMovies = async (url) => {
        const response = await fetch(url)
        const data = await response.json()
        showMovies(data)
    }
    //at very 1st time, call by default the pipular movies api. so that when users come on site . some movies avilable to them.
    getMovies(APIURL);     


    // date received from api will be added to inner html. 
    //  and will add to html part. for that we created new html element etc required.
    //   so that everything i.e 3 parameters will be visible to user on screen.
    // 3 parameters are- ratings, overview, title. Rating is on the scale of 10
    // using postman, we put only those key value pairs which will show these 3 datas




    const showMovies = (data) => {
        moiveBox.innerHTML = "";
        data.results.forEach(
            (result) => {
                const imagePath = result.poster_path === null ? "img/image-missing.png" : IMGPATH + result.poster_path;   
              
                //  the path/link of image is adding to image api by string concatenation imagePath i.e + sign
                //  on  line     ${imagePath} will give img url path from api and will add it to our HTML. similarly, title and raing ,overview and  vote average is fetching
               

                const box = document.createElement("div")
                box.classList.add("box")
                box.innerHTML = `
                     <img src="${imagePath}" alt="" />      
                      <div class="overlay">
                        <div class="title"> 
                            <h2> ${result.original_title}  </h2>
                            <span> ${result.vote_average} <span>
                        </div>
                        <h3>Overview:</h3>
                        <p> 
                            ${result.overview}
                        </p>
                     </div>
                `
                moiveBox.appendChild(box)
                // add the box as a child to html by js.so that visible to us. Important step.

            }
        )
    }

//    for searching purpose. when user is writing then call search api. will add every string of user to user api. like a, ah, aaajskj, will add in search api url and will show us relevant data.

//    Below if-else Statement will hepl in showing user popular movies when user isnt searching anything. but if he is searching, then will show data according to that.

    document.querySelector("#search").addEventListener(
        "keyup",   
        function (event) {
            if (event.target.value != "") {   

                getMovies(SEARCHAPI + event.target.value)
                //when in search bar value is not empty. means user is writing something . then show data according to search api. so called search api here
            }
             else {

                getMovies(APIURL);
                //else that is , when user is not searching. i.e value in search  bar is equal to empty. then show him popular movies. that's why  called popo.movie api here 
            }
        }
    )


