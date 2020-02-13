function search(city) {

    var date = moment().format("(M/D/YYYY)");
    var date1 = moment().add(1, "day").format("(M/D/YYYY)");
    var date2 = moment().add(2, "day").format("(M/D/YYYY)");
    var date3 = moment().add(3, "day").format("(M/D/YYYY)");
    var date4 = moment().add(4, "day").format("(M/D/YYYY)");
    var date5 = moment().add(5, "day").format("(M/D/YYYY)");
    // var city = $(this).attr("data-name");

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=2377d95879fb4746b71140f81c55a449";
    // creating an AJAX call for the specific city button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response);
        $("#city").text(response.name);
        $("#date").text(date);
        $("#icon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        $("#temp").text("Tempature: " + response.main.temp + " F");
        $("#humi").text("Humidity: " + response.main.humidity + "%");
        $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");

        var lat = response.coord.lat;
        var lon = response.coord.lon;

        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?APPID=2377d95879fb4746b71140f81c55a449&lat=" + lat + "&lon=" + lon;
        // Creating an AJAX call for UV
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function(data) {

            $("#uv").text("UV Index: " + data.value);

        });
    });

    var forcastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + ",usa&units=imperial&APPID=2377d95879fb4746b71140f81c55a449";
    // Creating an AJAX call for forcast
    $.ajax({
        url: forcastURL,
        method: "GET"
    }).then(function(info) {
        // forcast day 1
        $("#date-1").text(date1);
        $("#temp-1").text("Tempature: " + info.list[3].main.temp + " F");
        $("#icon-1").attr("src", "http://openweathermap.org/img/wn/" + info.list[3].weather[0].icon + ".png");
        $("#humi-1").text("Humidity: " + info.list[3].main.humidity + "%");
        // focast day 2
        $("#date-2").text(date2);
        $("#temp-2").text("Tempature: " + info.list[11].main.temp + " F");
        $("#icon-2").attr("src", "http://openweathermap.org/img/wn/" + info.list[11].weather[0].icon + ".png");
        $("#humi-2").text("Humidity: " + info.list[11].main.humidity + "%");
        // forcast day 3
        $("#date-3").text(date3);
        $("#temp-3").text("Tempature: " + info.list[19].main.temp + " F");
        $("#icon-3").attr("src", "http://openweathermap.org/img/wn/" + info.list[19].weather[0].icon + ".png");
        $("#humi-3").text("Humidity: " + info.list[19].main.humidity + "%");
        // forcast day 4
        $("#date-4").text(date4);
        $("#temp-4").text("Tempature: " + info.list[27].main.temp + " F");
        $("#icon-4").attr("src", "http://openweathermap.org/img/wn/" + info.list[27].weather[0].icon + ".png");
        $("#humi-4").text("Humidity: " + info.list[27].main.humidity + "%");
        // forcast day 5
        $("#date-5").text(date5);
        $("#temp-5").text("Tempature: " + info.list[35].main.temp + " F");
        $("#icon-5").attr("src", "http://openweathermap.org/img/wn/" + info.list[35].weather[0].icon + ".png");
        $("#humi-5").text("Humidity: " + info.list[35].main.humidity + "%");

    });
};
// array that holds cities that have been searched
var cities = [];

function buttons() {

    // deleting the cities prior to adding new cities
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // looping through the array of cities
    for (var i = 0; i < cities.length; i++) {

        // generates buttons for each city in the array
        // creates <li> tags 
        var a = $("<li>");
        // adding a class to the button
        a.addClass("btn btn-primary");
        // adding a data-attribute
        a.attr("data-name", cities[i]);
        // providing the initial button text
        a.text(cities[i]);
        // adding the button to the buttons-view id
        $("#buttons-view").append(a);
    }
}


$("#searchCity").on("click", function(event) {
    // preventing the button from trying to submit the form
    event.preventDefault();
    // storing the city name
    var inputCity = $("#inputCity").val().trim();
    // adding cities from the textbox to our array
    cities.push(inputCity);
    // running the search function(passing in the city as an argument)
    search(inputCity);

    buttons();
});

// adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".btn btn-primary", search);

// calling the buttons function to display the initial buttons
buttons();