"use strict";

console.log("Power to goats")

// global varibles
// querySelector returns the first element in the document that matches
let goatContainer = document.querySelector("section")
let resultsButton = document.querySelector("section + div")
let image1 = document.querySelector("section img:first-child")
let image2 = document.querySelector("section img:nth-child(2)")

let clicks = 0;
const maxClicksAllowed = 3

let allGoats = [];

function getRandomNumber(){
    return Math.floor(Math.random() * allGoats.length);
}

function Goat(name, src){
    this.name = name;
    this.src = src;
    this.clicks = 0;
    this.views = 0;
    allGoats.push(this);
    console.log(allGoats)
    
}

function renderGoats(){
    // we need to generate a number to reference the goat we want to render onto the page

    let goat1 = getRandomNumber();
    let goat2 = getRandomNumber();

    // how could we prevent goat1 being the same number as goat2?
    while(goat1 === goat2){
        goat2 = getRandomNumber();
    }
    // now we have two random numbers lets set the attributes of our images in the document.
    image1.src = allGoats[goat1].src
    console.log(image1.src)
    image2.src = allGoats[goat2].src
    image1.alt = allGoats[goat1].name
    image2.alt = allGoats[goat2].name
    allGoats[goat1].views++
    allGoats[goat2].views++
    console.log(allGoats[goat1].views)
    console.log(allGoats[goat2].views)
    
    
}

function handleGoatClick(event){
    // console.log("Your in the click")
    if(event.target === goatContainer){
        alert("please click on an image");
    } else{
        clicks++
        let clickedGoat = event.target.alt;
        for(let i = 0; i < allGoats.length; i++){
            if(clickedGoat === allGoats[i].name){
                allGoats[i].clicks++;
            break
            }
        }
    }

    if(clicks === maxClicksAllowed){
        goatContainer.removeEventListener("click", handleGoatClick)
        goatContainer.className = "no-voting";
        // resultsButton.addEventListener("click", renderResults);
        resultsButton.addEventListener("click", renderChart);
        resultsButton.className = "clicks-allowed"
    } else {
    renderGoats();
    }
}

const cruising = new Goat("Crusing goat", "assets/goat3.jpeg");
const happy = new Goat("Happy goats", "assets/goat2.jpeg");
const fussy = new Goat("Fussy goat", "assets/goat1.jpeg");

function renderResults(){
    console.log("Your results")
    let ul = document.querySelector("ul")
    for(let i= 0; i < allGoats.length; i++){
        let li = document.createElement("li")
        li.textContent = `${allGoats[i].name} had ${allGoats[i].views} views and was clicked ${allGoats[i].clicks} times`
        ul.appendChild(li)
    }
}

renderGoats()
// if you add () it will invoke the funcion before the event is heard
goatContainer.addEventListener("click", handleGoatClick);

function renderChart(){

    const goatNames = [];
    const goatViews = [];
    const goatClicks = [];

    for(let i = 0; i < allGoats.length; i++){
        goatNames.push(allGoats[i].name)
        goatViews.push(allGoats[i].views)
        goatClicks.push(allGoats[i].clicks)
    }
    console.log(goatNames)
    console.log(goatViews )
    console.log(goatClicks)

    const data ={
        lable: goatNames,
        datasets: [
            {
                lable: "Views",
                data: goatViews,
                backgroundColor: ["#42032C"],
                borderColor: ["#D36B00"],
                borderWidth: 1,
            },
            {
                lable: "Clicks",
                data: goatClicks,
                backgroundColor: ["#D36B00"],
                borderColor: ["#42032C"],
                borderWidth: 1,
            }
        ]
    }

    const config = {
        type: "bar",
        data: data,
    }
    
    const goatChart = document.getElementById("chart")
    const myChart = new Chart(goatChart,config)
}