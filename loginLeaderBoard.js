document.addEventListener("DOMContentLoaded", function() {
    loadLeaderboard();
    document.getElementById("login-btn").addEventListener("click", () => {
        document.getElementById("login-container").style.display = "block";
        document.getElementById("register-container").style.display = "none";
        document.getElementById("game-container").style.display = "none";
    });
    
    document.getElementById("register-btn").addEventListener("click", () => {
        document.getElementById("register-container").style.display = "block";
        document.getElementById("login-container").style.display = "none";
        document.getElementById("game-container").style.display = "none";
    });
    
    document.getElementById("login-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;
    
        const formData = new FormData();
        formData.append("action", "login");
        formData.append("username", username);
        formData.append("password", password);
    
        const response = await fetch("https://acskrisz.web.elte.hu/backend.php", { method: "POST", body: formData });
        const result = await response.json();
    
        if (result.success) {
            document.getElementById("login-container").style.display = "none";
            document.getElementById("logged-in-user").style.display = "block";
            document.getElementById("logged-in-user").innerHTML = "Bejelentkezve mint, " + result.username;
            loadLeaderboard();
        } else {
            document.getElementById("login-message").textContent = result.message;
        }
    });
    
    document.getElementById("register-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("register-username").value;
        const password = document.getElementById("register-password").value;
    
        const formData = new FormData();
        formData.append("action", "register");
        formData.append("username", username);
        formData.append("password", password);
    
        const response = await fetch("https://acskrisz.web.elte.hu/backend.php", { method: "POST", body: formData });
        const result = await response.json();
    
        if (result.success) {
            document.getElementById("register-message").textContent = "Sikeres regisztráció! Most jelentkezz be.";
        } else {
            document.getElementById("register-message").textContent = result.message;
        }
    });
});
async function loadLeaderboard() {
    try {
        const response = await fetch("https://acskrisz.web.elte.hu/backend.php?action=getLeaderboard");
        const result = await response.json();

        console.log(result);  

        if (result.success) {
            const leaderboard = document.getElementById("leaderboard");
            leaderboard.innerHTML = ""; 
            if (result.data && result.data.length > 0) {
                result.data.forEach((entry) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `${entry.username}: ${entry.score} pont`;
                    leaderboard.appendChild(listItem);
                });
            } else {
                console.log("Nincs adat a ranglistához!");
            }
        } else {
            console.error("Nem sikerült betölteni a ranglistát:", result.message);
        }
    } catch (error) {
        console.error("Hiba a ranglista betöltésekor:", error);
    }
}

async function saveScore(score) {
    const username = document.getElementById("logged-in-user").textContent.trim().split(" ").pop();
    if (!username) {
        console.error("Nincs felhasználónév a pontszám mentéséhez.");
        return;
    }

    const formData = new FormData();
    formData.append("action", "saveScore");
    formData.append("username", username);
    formData.append("score", score);

    try {
        const response = await fetch("https://acskrisz.web.elte.hu/backend.php", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            console.log("Pontszám sikeresen mentve:", result.message);
        } else {
            console.error("Pontszám mentése sikertelen:", result.message);
        }
    } catch (error) {
        console.error("Hiba történt a pontszám mentése során:", error);
    }
}

