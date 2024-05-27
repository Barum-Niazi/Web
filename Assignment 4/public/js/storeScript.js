$(document).ready(function () {
    function doBindings() {
        let genreButtons = document.getElementsByClassName("filter-button");
        for (let button of genreButtons) {
            button.addEventListener("click", function (event) {
                event.preventDefault();
                let genre = button.getAttribute("data-genre");
                filterGames(genre);
            });
        }
    }

    function filterGames(genre) {
        if (genre === "All") {
            window.location.href = "/store";
        } else window.location.href = `/store/genre/${genre}`;
    }

    doBindings();
});
