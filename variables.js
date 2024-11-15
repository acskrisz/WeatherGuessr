const cities = [
    { name: "Berlinben", latitude: 52.52, longitude: 13.41, image: "Resources/berlin.jpeg" },
    { name: "Tokyoban", latitude: 35.68, longitude: 139.76, image: "Resources/tokyo.jpeg" },
    { name: "New Yorkban", latitude: 40.71, longitude: -74.01, image: "Resources/newyork.jpeg" },
    { name: "Párizsban", latitude: 48.85, longitude: 2.35, image: "Resources/paris.jpeg" },
    { name: "Sydneyben", latitude: -33.87, longitude: 151.21, image: "Resources/sydney.jpeg" },
    { name: "Moszkvában", latitude: 55.75, longitude: 37.62, image: "Resources/moscow.jpeg" },
    { name: "Delhiben", latitude: 28.61, longitude: 77.23, image: "Resources/delhi.jpeg" },
    { name: "Los Angelesben", latitude: 34.05, longitude: -118.24, image: "Resources/losangeles.webp" },
    { name: "Chicagóban", latitude: 41.88, longitude: -87.63, image: "Resources/chicago.jpeg" },
    { name: "Miamiban", latitude: 25.76, longitude: -80.19, image: "Resources/miami.avif" },
    { name: "Buenos Airesben", latitude: -34.61, longitude: -58.38, image: "Resources/buenosaires.jpeg" },
    { name: "Rio de Janeiróban", latitude: -22.91, longitude: -43.17, image: "Resources/rio.jpeg" },
    { name: "Santiagóban", latitude: -33.45, longitude: -70.65, image: "Resources/santiago.jpeg" },
    { name: "Budapesten", latitude: 47.50, longitude: 19.04, image: "Resources/budapest.jpeg" },
    { name: "Debrecenben", latitude: 47.53, longitude: 21.63, image: "Resources/debrecen.webp" },
    { name: "Szegeden", latitude: 46.25, longitude: 20.15, image: "Resources/szeged.jpeg" },
    { name: "Pécsett", latitude: 46.07, longitude: 18.23, image: "Resources/pecs.jpeg" },
    { name: "Győrben", latitude: 47.69, longitude: 17.63, image: "Resources/gyor.jpeg" }
];

let actualTemperature = 0;
let score = 0;
let round = 0;
let usedCities = [];
let askedCities = [];
let guesses = [];
let actualTemperatures = [];
const totalRounds = 5;
let currentCity = {};
