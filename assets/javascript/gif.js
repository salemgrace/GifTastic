$(document).ready(function () {

    // Create an array of animals for the buttons
    var animalArray = ["giraffe", "panda", "monkey", "alligator", "armadillo",
        "sloth", "frog", "lion", "rhino", "penguin", "zebra"];


    function checkAnimalArray() {

        $("#button-holder").empty();

        for (var i = 0; i < animalArray.length; i++) {
            var animalButton = $("<button>");

            animalButton.attr("data-animal", animalArray[i]);

            animalButton.addClass("buttons");

            animalButton.text(animalArray[i]);

            $("#button-holder").append(animalButton);
        }

        console.log(animalArray);

    }

    // var animal;

    $("#button-adder").on("click", function (event) {
        event.preventDefault();

        var newAnimal = $("#input-animal").val().trim();
        console.log("New animal button: ", newAnimal);

        animalArray.push(newAnimal);

        checkAnimalArray();

        $("#input-animal").val("");


    });

    $(document).on("click", ".buttons", function () {
        // In this case, the "this" keyword refers to the button that was clicked

        $("#gifs-appear-here").empty();
        $(".buttons").removeClass("active");
        $(this).addClass("active");

        var animal = $(this).attr("data-animal");
        console.log("Button Clicked Animal: ", animal);


        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cyaIbgkfVto6nIfS1ZUnOnP738WcnUNZ&q=" +
            animal + "&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            // When the button is clicked, pictures with that search associated with it load
            var results = response.data;

            // Pull from giphy 10 pictures

            for (var i = 0; i < results.length; i++) {

                console.log(results[i]);

                var animalGifDiv = $("<div>");
                animalGifDiv.addClass("gif-class");

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;

                var animalGif = $("<img>");

                animalGif.attr("src", still);
                animalGif.attr("data-still", still);
                animalGif.attr("data-animate", animated);
                animalGif.attr("data-state", "still");
                animalGif.addClass("animal-image");

                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);

                animalGifDiv.append(p);
                animalGifDiv.append(animalGif);

                $("#gifs-appear-here").append(animalGifDiv);
            }
        });

    });

    $(document).on("click", ".animal-image", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    checkAnimalArray();

});