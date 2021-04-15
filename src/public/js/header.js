$(document).ready(function () {
  $(".oop-dd-btn").click(function () {
    $(this).toggleClass("active");
  });

  $(".repost_content").find(".deletepost").remove();
});
