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
       theTeam = document.querySelector('.team-section'),
       buttonContainer = document.querySelector('.query-controls');

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
    // let jokeButton = document.querySelector('#get-joke');

    // retrieve our prof data, and then build out the content
    // jokeButton.addEventListener('click', retrieveJoke);
    
    // getData('./data.json', changeCopy);

    function addCategoryButtons(categories) {
        // use the array Filter method to get rid of the explicit category
        // this returns back every entry in the arra that does not match "explicit"
        let activeCats = categories.filter(cat => cat !=="explicit").slice(0,6),
            tempContainer = new DocumentFragment(); // this is a virtual piece of HTML
            // think of it like a virtual div element
        // loop through the categories array and create a button for each category
        activeCats.forEach(button => {
            let buttonEl = document.createElement('button');
            
            // add a css to th new button
            buttonEl.className = 'joke-button';
            // add a cutstom data attribute to the new button
            buttonEl.dataset.cat = button;
            // add the text to the new button
            buttonEl.textContent = button;

            tempContainer.appendChild(buttonEl);

        })    
        // put all of the new buttons in the category button container in the HTML page
        buttonContainer.appendChild(tempContainer);
    }
    function getARandomJoke(event){
        // debugger;
        // check for the attribute we want to use in our query
        // if it does not exist do not run the api call
        // the ! is the not operator, this is basically cahecking for the custom data attribute on the button we
        // clicked and if it does not exist it will not run the api call-> there's no category to query from
        if(!event.target.dataset.cat) {return;} //nothing will execute
        getData(`https://api.chucknorris.io/jokes/random?category=${event.target.dataset.cat}`, showJoke);
    }

    buttonContainer.addEventListener('click', getARandomJoke);

    getData(`https://api.chucknorris.io/jokes/categories`, addCategoryButtons)
})();