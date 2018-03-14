$(document).ready(function() {

    // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=";
// 
    var topics = ["jurassic park", "back to the future", "jaws", "terminator", "harry potter", "universal monsters", "shrek", "despicable me", "men in black", "spiderman", "ghostbusters", "ET", "king kong", "twister"];
     
    
    function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < topics.length; i++){
            var a = $("<button>");
            a.addClass("movie");
            a.attr("movie-name", topics[i]);
            a.text(topics[i]);
            $("#buttons-view").prepend(a);
       }};

       function addNewButton(){
        $("#buttons-view").on("click", function(){
            var movie = $("#add-movie").val().trim();
            topics.push(movie);
            renderButtons();
        });
    }



    
    

    $("button").on("click", function(event) {
        event.preventDefault();
    });


    function displayMovies(){
        var movieInfo = $(this).attr("movie-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movieInfo + "&api_key=c3kGLRZNonrr45v8KXdkfPf7J48L86IA&limit=10";
        console.log(queryURL);
        $.ajax({url: queryURL, method: "GET"})
       .done(function(response) {
           var results = response.data;
           console.log(response.data);
        });

            $("#movies-view").empty(); 
            var results = response.data; 
            for (var i = 0; i < results.length; i++){
                
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
                
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
                gifImage.attr("data-state", "still"); // set the image state
                gifImage.addClass("image");
                gifDiv.append(gifImage);
              
                $("#movies-view").prepend(gifDiv);
            };
        }})
