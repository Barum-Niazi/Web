$(document).ready(function () {
    fetchCartData();
    function fetchCartData() {
        const token = localStorage.getItem("jwtToken"); // Retrieve the token from localStorage

        fetch("/api/cart", {
            headers: {
                "x-auth-token": `${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok)
                    throw new Error("Network response was not ok");
                return response.json();
            })
            .then((data) => {
                if (data.success && data.games.length > 0) {
                    buildCart(data.games);
                } else {
                    $("#cartItemsList").html(
                        '<li class="list-group-item">Your cart is empty</li>'
                    );
                }
            })
            .catch((error) => {
                console.error("Error loading cart:", error);
                alert("Error loading cart: " + error.message);
            });
    }

    function buildCart(games) {
        if (games.length === 0) {
            $("#cartItemsList").html(
                '<li class="list-group-item">Your cart is empty</li>'
            );
            $(".cart-total, .cart-checkout").hide();
        } else {
            let total = games.reduce((sum, game) => sum + game.price, 0);
            const itemsHtml = games
                .map(
                    (game) => `
                <li class="list-group-item cart-item">
                    <div class="item-details">
                        <img src="${game.coverImage}" alt="${game.name}" />
                        <div class="item-info">
                            <h4 class="item-name">${game.name}</h4>
                            <p class="item-price">$${game.price.toFixed(2)}</p>
                        </div>
                        <button class="remove-item" data-name="${game.name}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </li>
            `
                )
                .join("");
            $("#cartItemsList").html(itemsHtml);
            $("#totalPrice").text(`$${total.toFixed(2)}`);
            $(".cart-total, .cart-checkout").show();
        }
    }
    function removeFromCart(gameName, element) {
        const token = localStorage.getItem("jwtToken"); // Retrieve the token from localStorage

        $.ajax({
            url: `/api/cart/${encodeURIComponent(gameName)}`,
            type: "DELETE",
            headers: {
                "x-auth-token": `${token}`, // Add the token to the request headers
            },
            success: function (data) {
                if (data.success) {
                    $(element).closest(".cart-item").remove();
                    if ($("#cartItemsList").children().length === 0) {
                        $("#cartItemsList").html(
                            '<li class="list-group-item">Your cart is empty</li>'
                        );
                        $(".cart-total, .cart-checkout").hide();
                    } else {
                        updateTotalPrice();
                    }
                } else {
                    alert(data.message || "Error removing item from cart");
                }
            },
            error: function (error) {
                console.error("Error removing item from cart:", error);
                alert("Error removing item from cart: " + error.responseText);
            },
        });
    }

    $(document).on("click", ".remove-item", function () {
        var gameName = $(this).data("name");
        removeFromCart(gameName, this);
    });

    function updateTotalPrice() {
        let total = 0;
        $(".item-price").each(function () {
            total += parseFloat($(this).text().substring(1));
        });
        $("#totalPrice").text(`$${total.toFixed(2)}`);
    }
});
