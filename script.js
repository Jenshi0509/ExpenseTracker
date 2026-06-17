const apiKey = "efdb3a47c9219582ce7d1a5c9b51d244";

document.getElementById("city")
.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        getWeather();
    }
});

async function getWeather(){

    const city =
    document.getElementById("city").value.trim();

    const weatherDiv =
    document.getElementById("weather");

    const loading =
    document.getElementById("loading");

    if(city === ""){
        weatherDiv.innerHTML =
        "<p class='error'>Please enter a city name.</p>";
        return;
    }

    loading.classList.remove("hidden");
    weatherDiv.innerHTML = "";

    try{

        const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        if(!response.ok){
            weatherDiv.innerHTML =
            "<p class='error'>City not found!</p>";
            loading.classList.add("hidden");
            return;
        }

        weatherDiv.innerHTML = `
            <h2>${data.name}</h2>

            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">

            <div class="data">

            🌡 Temperature: ${Math.round(data.main.temp)}°C<br>

            🤗 Feels Like: ${Math.round(data.main.feels_like)}°C<br>

            💧 Humidity: ${data.main.humidity}%<br>

            💨 Wind Speed: ${data.wind.speed} m/s<br>

            ☁ Condition: ${data.weather[0].description}

            </div>
        `;

    }catch(error){

        weatherDiv.innerHTML =
        "<p class='error'>Something went wrong.</p>";

    }

    loading.classList.add("hidden");
}