"use strict"

// const audio = document.querySelector("audio")
// audio.play(); // this will stat the video playing when site loads

const piano = document.getElementById("piano-music")
// piano.onplay();

document.getElementById("randomizer").addEventListener("click", function(){
    piano.volume = Math.random();
    console.log(piano.volume)
})
