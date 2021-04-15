$(document).ready(function () {

const repost_forms = document.getElementsByClassName("oop_repost_form");

for (let form of repost_forms) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    console.log('repost pressed');
    const post_username = document.querySelector(`#${this.id} .oop_post_username`).value;

    const post_id = document.querySelector(`#${this.id} .oop_post_id`).value;

    const form_obj = {
      username: post_username,
      post_id: post_id,
    };

    postFetch("/posts/repost", form_obj, () => {
        console.log('window.location.pathname');
        console.log(window.location.pathname);

        if (window.location.pathname == "/posts") {
            location.reload();
        }
        else {
          alert("reposted to your timeline!");
      }
    });
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

  console.log('postFetch response ' + response);
  cb();
}

});