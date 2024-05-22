$(document).ready(function () {
    async function addToCart(event) {
        console.log("Adding to cart");
        event.preventDefault();
        event.stopPropagation();

        const gameName = this.getAttribute("data-game-name");
        if (!gameName) {
            console.error("Game name is missing");
            return;
        }

        try {
            await fetch(`/add-to-cart/${encodeURIComponent(gameName)}`, {
                method: "GET",
            });
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    }

    // Handle card click for navigation to description page
    document.querySelectorAll(".card").forEach((card) => {
        card.addEventListener("click", function (event) {
            if (!event.target.closest(".btn")) {
                // Ignore clicks on buttons
                const gameName = this.getAttribute("data-name");
                if (gameName) {
                    window.location.href = `/store/description/${encodeURIComponent(
                        gameName
                    )}`;
                }
            }
        });
    });

    document.querySelectorAll(".cart-button").forEach((button) => {
        button.addEventListener("click", addToCart);
    });
});
