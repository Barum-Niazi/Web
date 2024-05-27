$(document).ready(function () {
    $("#searchForm").on("submit", function (e) {
        var searchInput = $("#searchInput").val().trim();

        if (searchInput === "") {
            e.preventDefault();
            alert("Please enter a search term");
        }
    });
});
