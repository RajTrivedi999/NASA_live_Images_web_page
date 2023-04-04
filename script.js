let body=document.getElementById("body");
let currentImage=document.getElementById("current-image-container");
let search=document.getElementById("search-input");
let btn=document.querySelector('button')
let history=document.getElementById("search-history")
let searches=[];
let your_api_key="PvfZgejcDhOr2h5sXedsAajSlhiJyVTx7hRGe8ac";
let currentDate=document.createElement('h1');
let img=document.createElement('img');
img.classList="myImage"
let heading=document.createElement('h3');
let pera=document.createElement('p');
let previousDate=document.createElement('h2');

function addSearchToHistory(date){
    let list=document.createElement('li');
    let link=document.createElement('a');
    link.setAttribute('href','#');
    link.innerHTML=date;
    list.appendChild(link);
    history.appendChild(list);

    let li=document.querySelectorAll('li');
    li.forEach(val => {
        val.addEventListener('click',getImageOfTheDay);
    })
}

function saveSearch(date){
    searches.push({"Date" : date});
    localStorage.setItem("history",JSON.stringify(searches));
    console.log(localStorage.getItem("history"));
    addSearchToHistory(date)
}

function getImageOfTheDay(e){
    let date;

    if((e.target.innerHTML).length==10){
        date=e.target.innerHTML;
    }
    else{
        date=search.value;
        if(date.length==0){
            alert("add proper date");
            return;
        }
    }
    e.preventDefault();
    //console.log(date);
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${your_api_key}`)
    .then((res)=>res.json())
    .then( data =>{
        currentDate.innerText=`Picture On ${date}`;
        img.src=data.url;
        pera.innerHTML=data.explanation;
        heading.innerHTML=data.title;
        
        currentImage.appendChild(currentDate);
        currentDate.appendChild(img);
        currentDate.appendChild(heading);
        currentDate.appendChild(pera);
    })
    if((e.target.innerHTML).length!=10)saveSearch(date)

    localStorage.setItem('history',date);
}

function getCurrentImageOfTheDay(){
    let date= new Date().toISOString().split("T")[0];

    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${your_api_key}`)
    .then((res)=>res.json())
    .then( data =>{
        //console.log(JSON.stringify(data));
        currentDate.innerText="NASA Picture of the Day";
        img.src=data.url;
        pera.innerHTML=data.explanation;
        heading.innerHTML=data.title;
        
        currentImage.appendChild(currentDate);
        currentDate.appendChild(img);
        currentDate.appendChild(heading);
        currentDate.appendChild(pera);
    })
    btn.addEventListener('click', getImageOfTheDay)
}

window.addEventListener('load', getCurrentImageOfTheDay);