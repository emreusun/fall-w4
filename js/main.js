// imports go at the top of the JS file
import { getData } from "./modules/dataMiner.js";
// this is an IIFE (Immediately Invoked Function Expression)
// this is greate for encapsulating code / making it private
// and is also a Javascript programming patter (the Module Pattern)

(() => {
    console.log('fired');
    // test the module


  
    // get a reference to the template's contents and the target container
    // into which we'll clone a copy of the markup
    let theTemplate = document.querySelector("#user-template").content,
       theTeam = document.querySelector('.team-section');

    // let theHeader = document.querySelector(".user-name"),
    //     theDesc = document.querySelector(".user-desc");

    function changeCopy(profs) {
        // parse the top-level props from the profs object (the prof names)
        let theProfs = Object.keys(profs);

        // ['Trevor', 'John', 'Joe', 'Justin']

        theProfs.forEach(prof => {
        
        // make a copy of the contents of the template tag
        let panel = theTemplate.cloneNode(true),
            containers = panel.firstElementChild.children; // the sections tag's contents
        // put the prof data were it needs to go (just text for now)
        containers[0].querySelector('img').src = `images/${profs[prof].biopic}`;
       

        containers[1].textContent = profs[prof].name;
        containers[2].textContent = profs[prof].role;
        
        //paste the prof markup into the team section on the page
        theTeam.appendChild(panel);
    })

 }
    function showJoke(data) {
        // show the random chuck norris joke in the UI
        debugger;
        let theJoke = document.querySelector('.joke-text');

        theJoke.textContent = data.value;
        
    }
    function retrieveJoke() {
        getData(`https://api.chucknorris.io/jokes/random`, showJoke);
    }
    let jokeButton = document.querySelector('#get-joke');

    // retrieve our prof data, and then build out the content
    jokeButton.addEventListener('click', retrieveJoke);
    
    getData('./data.json', changeCopy);
    // getData(`https://api.chucknorris.io/jokes/random`, showJoke)
})();