$(document).ready(function () {
    fetchCartData(); // Fetch cart data when the page loads
    // Fetch and build cart data
    function fetchCartData() {
        fetch("/api/cart")
            .then((response) => {
                console.log("Response:", response);

                if (!response.ok)
                    throw new Error("Network response was not ok");
                return response.json();
            })
            .then((data) => {
                console.log(data); // Log the data to see what's being returned
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
            $(".cart-total, .cart-checkout").hide(); // Hide these elements when cart is empty
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
            $(".cart-total, .cart-checkout").show(); // Show these elements when cart has items
        }
    }
    function removeFromCart(gameName, element) {
        console.log("Attempting to remove from cart:", gameName);
        $.ajax({
            url: `/api/cart/${encodeURIComponent(gameName)}`,
            type: "DELETE",
            success: function (data) {
                console.log("Remove from cart response:", data);
                if (data.success) {
                    // Remove the item element from the DOM
                    $(element).closest(".cart-item").remove();

                    // Check if there are any items left in the cart
                    if ($("#cartItemsList").children().length === 0) {
                        $("#cartItemsList").html(
                            '<li class="list-group-item">Your cart is empty</li>'
                        );
                        $(".cart-total, .cart-checkout").hide(); // Hide total and checkout button if cart is empty
                    } else {
                        // Optionally, update total price here without full page reload
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

    // Call removeFromCart with the element reference
    $(document).on("click", ".remove-item", function () {
        var gameName = $(this).data("name");
        removeFromCart(gameName, this);
    });

    // Function to update total price dynamically
    function updateTotalPrice() {
        let total = 0;
        $(".item-price").each(function () {
            total += parseFloat($(this).text().substring(1)); // Assume prices are formatted as "$x.xx"
        });
        $("#totalPrice").text(`$${total.toFixed(2)}`);
    }
});
