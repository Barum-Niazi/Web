$(document).ready(function () {
    $("#searchForm").on("submit", function (e) {
        if ($("#searchInput").val() === "") {
            e.preventDefault();
            alert("Please enter a search term");
        }
    });
});
