$(document).ready(function () {
  $("img").hover(
    function () {
      var src = $(this).attr("src");
      $(this).after("<div class='img-text'>" + src + "</div>");
    },
    function () {
      $(".img-text").remove();
    }
  );
});
