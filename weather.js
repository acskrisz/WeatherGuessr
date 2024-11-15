async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`);
        const data = await response.json();
        if (data.current_weather) {
            actualTemperature = data.current_weather.temperature;
        } else {
            alert("Nem sikerült lekérdezni az időjárási adatokat, próbálkozz később!");
        }
    } catch (error) {
        console.error("Nem sikerült lekérdezni az időjárási adatokat:", error);
    }
}
