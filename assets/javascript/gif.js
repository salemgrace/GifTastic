$(document).ready(function() {

// Create an array of animals for the buttons
var animalArray = ["giraffe", "panda", "monkey"];

for (var i = 0; i < animalArray.length; i++) {
    var animalButton = $("<button>");
    
    animalButton.attr("data-animal", animalArray[i]);
}

var animal;

$("#button-adder").on("click", function(event) {
    event.preventDefault();

    var newAnimal = $("#input-animal").val().trim();
    console.log("New animal button: ", newAnimal);

    animalButton = $("<button>");

    animalButton.addClass("buttons");
    animalButton.attr("data-animal", newAnimal);
    animalButton.text(newAnimal);

    $("#button-holder").append(animalButton);

    $("#input-animal").val("");


});

$(".buttons").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    
    $("#gifs-appear-here").empty();

    animal = $(this).attr("data-animal");
    console.log("Button Clicked Animal: ", animal);


var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cyaIbgkfVto6nIfS1ZUnOnP738WcnUNZ&q=" + 
    animal + "&limit=10";


// displayImages () { 
//     for (var i = 0; i < animalArray[this.currentAnimal].length; i++) {
//             ("button class='new-animal-button' id='button' data-name='" + 
//             animalArray[this] + "'></button>");
//         }
//     }

$.ajax({
    url: queryURL,
    method: "GET"
}) .then(function(response) {  
    console.log(response);

// When the button is clicked, pictures with that search associated with it load
var results = response.data;

// Pull from giphy 10 pictures

for (var i = 0; i < results.length; i++) {
    
    console.log(results[i]);

    var animalGifDiv = $("<div>");
    animalGifDiv.addClass("gif-class");

    var animalGif = $("<img>");
    animalGif.attr("src", results[i].images.fixed_height_still.url);
    
    var rating = results[i].rating;
    var p = $("<p>").text("Rating: " + rating);

    animalGifDiv.append(p);
    animalGifDiv.append(animalGif);

    $("#gifs-appear-here").append(animalGifDiv);
}

// For these pictures they need to be formated in the same size for layout

// The pictures can only move when clicked - they should come "paused"

// When a new animal is entered in the search, ten new pictures appear

// The pictures clear out when a new group of ten is loaded in

});

});

});