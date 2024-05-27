const axios = require("axios");
const Game = require("../models/Game");
const config = require("config");
const apiURL = config.get("apiURL");
const apiKey = config.get("apiKey");

async function fetchGameDetails(gameid) {
    try {
        const response = await axios.get(`${apiURL}/${gameid}?key=${apiKey}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching game details:", error);
        return null;
    }
}

async function fetchAndStoreGames() {
    let page = 1;
    let totalRecords = 0;
    const recordsToFetch = 500;
    const pageSize = 40;

    while (totalRecords < recordsToFetch) {
        try {
            const response = await axios.get(
                `${apiURL}?key=${apiKey}&page=${page}&page_size=${pageSize}`
            );
            const games = response.data.results;

            for (const gameData of games) {
                const gameDetails = await fetchGameDetails(gameData.id);

                const game = new Game({
                    name: gameDetails.name,
                    releaseDate: gameDetails.released,
                    rating: gameDetails.rating,
                    coverImage: gameDetails.background_image,
                    backgroundImage:
                        gameDetails.background_image_additional ||
                        gameDetails.background_image,
                    genres: gameDetails.genres.map((genre) => genre.name),
                    description:
                        gameDetails.description_raw ||
                        "Description not available",
                    price: (Math.random() * (60 - 20) + 20).toFixed(2),
                });
                await game.save();
                totalRecords++;
                if (totalRecords >= recordsToFetch) {
                    break;
                }
            }
            page++;
        } catch (error) {
            console.error("Error fetching games data:", error);
            break;
        }
    }

    console.log(`${totalRecords} games data fetched and stored successfully`);
}

module.exports = fetchAndStoreGames;
