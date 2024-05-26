$(document).ready(function () {
    $("#loginForm").on("submit", function (event) {
        event.preventDefault();
        var email = $("#email").val();
        var password = $("#password").val();
        login(email, password);
    });

    function login(email, password) {
        fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                const token = response.headers.get("x-auth-token");
                if (token) {
                    localStorage.setItem("jwtToken", token);
                    window.location.href = "/";
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                if (data && data.message) {
                    alert(data.message);
                }
            })
            .catch((error) => console.error("Error during login:", error));
    }
});
