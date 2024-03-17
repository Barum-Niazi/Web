function doBindings() {
    $("#submitBtn").on("click", handleFormSubmission);
}

$(doBindings);

function handleFormSubmission(event) {
    if (
        $("#name").val() === "" ||
        $("#email").val() === "" ||
        $("#message").val() === ""
    ) {
        alert("Please fill out all fields");
        event.preventDefault();
    }
}
