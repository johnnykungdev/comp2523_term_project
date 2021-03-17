console.log("stopper");

// document.getElementsByClassName("oop_repost_form").addEventListener("submit", function (e) {
//   e.preventDefault();
//   console.log("punked!");
// });

// function repost(e) {
//   e.preventDefault();
//   console.log("punked!");
// }

const repost_forms = document.getElementsByClassName("oop_repost_form");

for (let form of repost_forms) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    //   const formData = new FormData(document.getElementById(this.id));

    const post_username = document.querySelector(`#${this.id} .oop_post_username`).value;

    const post_id = document.querySelector(`#${this.id} .oop_post_id`).value;

    const form_obj = {
      username: post_username,
      post_id: post_id,
    };

    postFetch("/interact/repost", form_obj, () => {
      alert("reposted to your timeline!");
      console.log(window.location.pathname);
      if (window.location.pathname == "/posts") {
        location.reload();
      }
    });

    // console.log(this.getElementsByClassName("oop_post_username")[0].value());
  });
}

async function postFetch(link, formData, cb) {
  const response = await fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  });
  cb();
}
