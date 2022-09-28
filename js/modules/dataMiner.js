function getData(targeturl, callback) {
    console.log('fired from the data miner module');

    // fetch is JS API that runs AJAX requests
    // and get data from a resource
    fetch(targeturl) // pass in the path to the data source
         .then(res => res.json()) // convert JSON to plain JS object
        // the res is the data that we're retrieving from the resource
        .then(data => { // data is the converthed JS object -> not it's just data (js object)
            console.log(data);
            // run the call back when we get all our data back and ready to go
            // this gets passed in by reference when we invoke the dataMiner in the main.js file
            callback(data);
        })
    .catch(error => console.error(error)); // catch any errors that might happen and report them to dev
    }
export { getData }