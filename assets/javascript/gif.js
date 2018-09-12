// Create an array of animals for the buttons
var animalArray = ["tiger", "bear", "skunk"];


$("#animal-button").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var animal = $(this).attr("data-animal");


var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cyaIbgkfVto6nIfS1ZUnOnP738WcnUNZ&q=" + 
    animal + "&limit=10";

$.ajax({
    url: queryURL,
    method: "GET"
}) .then(function(response) {  
    console.log(response);

// When the button is clicked, pictures with that search associated with it load
var results = response.data;

// Pull from giphy 10 pictures
for (var i = 0; i <results.length; i++) {
    var animalGifDiv = $("<div>");

    var rating = results[i].rating;

    var p = $("<p>").text("Rating: " + rating);

    var animalGif = $("<img>");

    animalGif.attr("src", results[i].images.fixed_height.url);

    animalGifDiv.append(p);
    animalGifDiv.append(animalGif);

    $("#gifs-appear-here").prepend(animalGif);

}

// For these pictures they need to be formated in the same size for layout

// The pictures can only move when clicked - they should come "paused"

// When a new animal is entered in the search, ten new pictures appear

// The pictures clear out when a new group of ten is loaded in

});

});