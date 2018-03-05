var movieArray = ["Step Brothers", "Borat", "Dumb and Dumber", "Office Space", "Napoleon Dynamite", "Bad Santa", "The Hangover", "The 40-Year-Old Virgin", "Anchorman: The Legend of Ron Burgundy", "Talladega Nights"];

$(document).ready(function() {
    for (var i = 0; i < movieArray.length; i++) {
        $("#movieButtons").append("<button type='button' onclick='searchGif(\"" + movieArray[i] + "\")' class='btn btn-primary' value=' " + movieArray[i] + "'> " + movieArray[i] + " </button>");
    }
});

function movieButtonClicked() {
    var userInput = $('#movieInput').val();
    searchGif(userInput);
}

function submitButtonClicked() {
    var userInput = $('#movieInput').val();

    if (userInput) {
        $('#movieButtons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(gifName) {
    $.ajax({
        url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=gfN5KdQIAtShBNpe5jV2QYsWNFhGs63m',
        type: 'GET',
    })
    .done(function(response) {
        displayGif(response);
    })
}

function displayGif(response) {
    $("#movies").empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating: " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url + 
        '" data-still=" ' + response.data[i].images.fixed_height_still.url + 
         ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height="250px">';

         image = '<div class="col-md-4">' + image + "</div>";
         $("#movies").append(image);
    }

    $(".movImage").on("click", function() {
        var state = $(this).attr("data-state");
        if(state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
}