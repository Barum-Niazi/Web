$(document).ready(function () {
    function addToCart(event) {
        event.preventDefault();
        var gameName = $(this).attr("data-game-name");
        if (!gameName) {
            console.error("Game name is missing");
            return;
        }

        $.post(`/add-to-cart/${encodeURIComponent(gameName)}`)
            .done(function () {
                console.log("Added to cart:", gameName);
            })
            .fail(function (error) {
                console.error("Error adding to cart:", error);
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

    $(".remove-item ").on("click", function () {
        var gameName = $(this).closest(".remove-item").data("name");
        console.log("Icon clicked, removing game:", gameName);
        removeFromCart(gameName);
    });

    function removeFromCart(gameName) {
        console.log("Attempting to remove from cart:", gameName);
        $.ajax({
            url: `/remove-from-cart/${encodeURIComponent(gameName)}`,
            type: "DELETE",
            success: function (data) {
                console.log("Remove from cart response:", data);
                if (data.success) {
                    location.reload();
                } else {
                    alert(data.message || "Error removing item from cart");
                }
            },
            error: function (error) {
                console.error("Error removing item from cart:", error);
                alert("Error removing item from cart: " + error);
            },
        });
    }
});
