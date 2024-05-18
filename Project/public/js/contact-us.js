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
        $("#name").addClass("error");
        $("#email").addClass("error");
        $("#message").addClass("error");
        alert("Please fill in all fields before submitting the form.");
        event.preventDefault();
    }
}
