// ==UserScript==
// @name         YoutubeSpeed
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  play youtube videos at any speed from 0-16x
// @author       scamper-paws
// @match        https://www.youtube.com/watch*
// @grant        none
// ==/UserScript==

"use strict";

function makeButtons() {
    if(!document.getElementById("speed-div")) {
        var newElement = document.createElement('div');
        document.getElementById('center').appendChild(newElement);
        newElement.outerHTML = '<div id="speed-div" style="margin: 0px 0px 0px 15px;"><input type="input" id="speed-textbox" size="3"></input><button type="button" id="speed-button">speed</button></div>';
        document.getElementById("speed-button").addEventListener("click", changeSpeed);
    }
}

function changeSpeed() {
    const speed = parseFloat(document.getElementById("speed-textbox").value);
    console.log("speed: " + speed);
    if (speed < 0 || speed > 16 || isNaN(speed)) {
        console.log("select a speed between 0 and 16");
    }
    document.querySelector('video').playbackRate=(speed);
}

if (document.readyState == "complete") {
    makeButtons();
} else {
    window.addEventListener("load", makeButtons);
}

// change bg color to black and text color to gray for theater mode
const theaterElement = document.getElementById("masthead");
const mutationCallback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
            if (mutation.attributeName === "theater" || mutation.attributeName === "dark") {
                if (mutation.oldValue === null) {
                    console.log('theater mode entered');
                    document.getElementById("speed-textbox").style="background-color: black; color: white";
                    document.getElementById("speed-button").style="background-color: black; color: gray";
                } else {
                    console.log('theater mode exited');
                    document.getElementById("speed-textbox").removeAttribute("style");
                    document.getElementById("speed-button").removeAttribute("style");
                }
                break;
            }
        }
    }
};
const observerOptions = {
    attributes: true,
    attributeOldValue: true
};
const observer = new MutationObserver(mutationCallback);
observer.observe(theaterElement, observerOptions);
