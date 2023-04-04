let body=document.getElementById("body");
let currentImage=document.getElementById("current-image-container");
let search=document.getElementById("search-input");
let your_api_key="PvfZgejcDhOr2h5sXedsAajSlhiJyVTx7hRGe8ac";
let currentDate=document.createElement('h1');
let img=document.createElement('img');
img.classList="myImage"
let heading=document.createElement('h3');
let pera=document.createElement('p');
let previousDate=document.createElement('h2');

function getCurrentImageOfTheDay(){
    let date= new Date().toISOString().split("T")[0];

    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${your_api_key}`)
    .then((res)=>res.json())
    .then( data =>{
        console.log(JSON.stringify(data));
        currentDate.innerText="NASA Picture of the Day";
        img.src=data.url;
        pera.innerHTML=data.explanation;
        heading.innerHTML=data.title;
        
        currentImage.appendChild(currentDate);
        currentDate.appendChild(img);
        currentDate.appendChild(heading);
        currentDate.appendChild(pera);
    })

    previousDate.innerText="Previous Searches"
    body.appendChild(previousDate)
}

getCurrentImageOfTheDay()