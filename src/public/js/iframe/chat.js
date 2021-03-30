$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);

  const myParam = urlParams.get("from");

  if (myParam == "messages") {
    $(".chat_header").prepend(`              <a class="clickable" href="messages.html">
      <img class="back_arrow" src="./assets/icons/back_arrow.png"></img>
    </a>`);
  } else if (myParam == "grid") {
    $(".chat_header").prepend(`              <a class="clickable" href="profile.html?from=grid">
      <img class="back_arrow" src="./assets/icons/back_arrow.png"></img>
    </a>`);
  } else {
    $(".chat_header").prepend(`              <a class="clickable" href="profile.html?from=post">
      <img class="back_arrow" src="./assets/icons/back_arrow.png"></img>
    </a>`);
  }

  $(".msg_input .submit").on("click", () => {
    let msg = $(".msg_input textarea").val();
    let msg_string = `
        <p class="my_msg">${msg}</p>
        `;
    $("section.messages").append(msg_string);
    $(".msg_input textarea").val("");
  });
});
