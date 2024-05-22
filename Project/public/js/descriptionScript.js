$(document).ready(function () {
    function doBindings() {
        const cards = document.querySelectorAll(".card");
        console.log(`Binding events to ${cards.length} cards.`);
        cards.forEach((card) => {
            card.addEventListener("click", function (event) {
                event.preventDefault();
                const gameName = this.getAttribute("data-name");
                console.log(`Clicked on game: ${gameName}`);
                if (gameName) {
                    showDescription(gameName);
                } else {
                    console.error("Game name is not available");
                }
            });
        });
    }

    function showDescription(gameName) {
        window.location.href = `/store/description/${encodeURIComponent(
            gameName
        )}`;
    }

    doBindings();
});
