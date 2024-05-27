$(document).ready(function () {
    function addToCart(event) {
        event.preventDefault();
        var gameName = $(this).attr("data-game-name");
        if (!gameName) {
            console.error("Game name is missing");
            return;
        }

        $.ajax({
            url: "/api/cart", // Corrected URL
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ name: gameName }),
            success: function () {
                console.log("Added to cart:", gameName);
            },
            error: function (xhr, status, error) {
                console.error("Error adding to cart:", error);
            },
        });
    }
    $(".card").on("click", function (event) {
        if (!$(event.target).closest(".btn").length) {
            var gameName = $(this).data("name");
            if (gameName) {
                window.location.href = `/store/description/${encodeURIComponent(
                    gameName
                )}`;
            }
        }
    });

    $(".customer-img").on("click", function () {
        var gameName = $(this).attr("alt");
        if (gameName) {
            window.location.href = `/store/description/${encodeURIComponent(
                gameName
            )}`;
        }
    });

    $(".cart-button").on("click", addToCart);

    $(".carousel-item").on("click", function () {
        var img = $(this).find("img");
        var gameName = img.attr("alt");
        if (gameName) {
            window.location.href = `/store/description/${encodeURIComponent(
                gameName
            )}`;
        }
    });
});
