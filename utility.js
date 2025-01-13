function loadCityImage(imageSrc) {
    const canvas = document.getElementById('city-canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
}

function createGIF(url) {
    return `
        <iframe src="${url}" width="100" height="100" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    `;
}

function updateResultText(guess, actualTemperature) {
    const difference = Math.abs(guess - actualTemperature);
    let resultText = `A tipped ${guess}°C volt. A jelenlegi ottani hőmérséklet: ${actualTemperature}°C.`;
    let points = 0;

    if (difference === 0) {
        resultText += " Tökéletes! Sikerült kitalálnod az ottani hőmérsékletet!";
        points = 15;
    } else if (difference <= 1) {
        resultText += " Nagyon jó tipp! Majdnem sikerült pontosan kitalálnod.";
        points = 12;
    } else if (difference <= 3) {
        resultText += " Szép munka! Nagyon közel jártál!";
        points = 7;
    } else if (difference <= 7) {
        resultText += " Nem rossz! Picit tévedtél.";
        points = 5;
    } else {
        resultText += " Nagyon messze vagy! A következő biztosan jobban fog menni.";
    }

    return { resultText, points };
}

