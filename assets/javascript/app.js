$(document).ready(function() {

    // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=";
    // Array of favorite movies
    var topics = ["jurassic park", "back to the future", "jaws", "terminator", "harry potter", "universal monsters", "shrek", "despicable me", "men in black", "spiderman", "ghostbusters", "ET", "king kong", "twister"];
     
    // function to render buttons
    function renderButtons() {
        $("#buttons-view").empty();
        // loop through array
        for (var i = 0; i < topics.length; i++){
        // variable for button HTML insertion
            var a = $("<button>");
            // making a movie class for my buttons
            a.addClass("movie");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttons-view").prepend(a);
        }
    };
    renderButtons();    // JUST ADDED THIS HERE SO THE BUTTONS COME UP WHEN THE PAGE LOADS

    // prevents page from reloading on click
    $("#add-movie").on("click", function(event) {
        event.preventDefault();
        var newMovie = $("#movie-input").val().trim();
        topics.push(newMovie);
        renderButtons();
    });


// Display the gifs
    $(document).on("click", ".movie", function displayMovies(){
        var movieInfo = $(this).attr("data-name");
        // passes the movie information into the giphy api with a limit of 10 per page
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movieInfo + "&api_key=c3kGLRZNonrr45v8KXdkfPf7J48L86IA&limit=10";

        // CALL THE AJAX
        $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response){
           var results = response.data;
           console.log(results);

           // CLEAR THE OLD GIFS
           $("#movies-view").empty();
   
           // LOOP OVER THE RESULTS AND APPEND THEM TO THE PAGE
           for (var i = 0; i < results.length; i++){
               var gifDiv = $("<div>");         // CREATE A DIV TAG
               gifDiv.addClass("gifDiv");       // ADD gifDiv CLASS
               var gifImage = $("<img>");       // CREATE A IMG TAG
               gifImage.attr("src", results[i].images.fixed_height_small_still.url);            // SRC
               gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);      // DATA-STILL URL
               gifImage.attr("data-animate",results[i].images.fixed_height_small.url);          // DATA-ANIMATE URL
               gifImage.attr("data-state", "still"); // set the image state                     // DATA-STATE ATTRIBUTE
               gifImage.addClass("image");                                                      // IMAGE CLASS ADDED
               gifDiv.append(gifImage);                                                         // APPEND THAT TO THE PAGE
               
               $("#movies-view").prepend(gifDiv);
           };
        });

    }); // .MOVIE CLICK CLOSER

}); // DOCUMENT.READY CLOSER