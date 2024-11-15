function submitGuess() {
    const guess = parseFloat(document.getElementById("temperature-guess").value);
    if (isNaN(guess)) {
        alert("Rossz formátum!");
        return;
    }
    guesses.push(guess);
    const { resultText, points } = updateResultText(guess, actualTemperature);
    score += points;
    document.getElementById("result").textContent = resultText;
    document.getElementById("score").textContent = score;
    setTimeout(nextRound, 4000);
}

function startGame() {
    score = 0;
    round = 0;
    askedCities = [];
    guesses = [];
    actualTemperatures = [];
    usedCities = [];
    document.getElementById("score").textContent = score;
    document.getElementById("game-container").style.display = "block";
    document.getElementById("end-screen").style.display = "none";
    nextRound();
}

async function nextRound() {
    if (round < totalRounds) {
        document.getElementById("temperature-guess").value = "";
        document.getElementById("result").textContent = "";

        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * cities.length);
        } while (usedCities.includes(randomIndex));
        usedCities.push(randomIndex);

        currentCity = cities[randomIndex];
        document.getElementById("city-name").textContent = currentCity.name;
        askedCities.push(currentCity);
        await fetchWeather(currentCity);
        actualTemperatures.push(actualTemperature);
        loadCityImage(currentCity.image);
        round++;
    } else {
        endGame();
    }
}

function endGame() {
    document.getElementById("game-container").style.display = "none";
    document.getElementById("end-screen").style.display = "block";

    const finalScoreText = `A játék véget ért! Pontszámod: ${score}`;
    let performanceText;
    let gifHTML = '';

    if (score >= 40) {
        performanceText = " - Remek teljesítmény!";
        gifHTML = createGIF("https://giphy.com/embed/MViYNpI0wx69zX7j7w");
    } else if (score >= 25) {
        performanceText = " - Szép munka, de van még hova fejlődni!";
        gifHTML = createGIF("https://giphy.com/embed/3o7abKhOpu0NwenH3O");
    } else {
        performanceText = " - Ne csüggedj el, próbáld újra!";
        gifHTML = createGIF("https://giphy.com/embed/wfS4vDyVsASQygl4mN");
    }

    document.getElementById("result-canvas").innerHTML = gifHTML;
    document.getElementById("final-score").textContent = `${finalScoreText} ${performanceText}`;

    let summaryHTML = "<h3>Játék összefoglaló</h3><div class='summary-box'>";
    askedCities.forEach((city, idx) => {
        const guess = guesses[idx];
        const actualTemp = actualTemperatures[idx];
        const difference = Math.abs(guess - actualTemp);
        let points = 0;
        let colorClass = "";

        if (difference === 0) {
            points = 15;
            colorClass = "perfect";
        } else if (difference <= 1) {
            points = 10;
            colorClass = "very-close";
        } else if (difference <= 3) {
            points = 7;
            colorClass = "close";
        } else if (difference <= 7) {
            points = 5;
            colorClass = "far";
        } else {
            points = 0;
            colorClass = "very-far";
        }

        summaryHTML += `
            <div class="summary-item ${colorClass}" style="animation-delay: ${idx * 1}s;">
                <strong>${city.name}</strong>: Tippelt: ${guess}°C - Valós: ${actualTemp}°C - Pontszám: ${points} 
            </div>
        `;
    });
    summaryHTML += "</div>";
    document.getElementById("summary").innerHTML = summaryHTML;
}
