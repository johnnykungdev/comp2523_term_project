// let notice_arr = [
//   {
//     id: "n1",
//     createdAt: "2012-01-09T12:25:13Z",
//     type: "commented",
//     post_id: "abc3",
//     originator: "bill",
//   },
//   {
//     id: "n2",
//     createdAt: "2012-01-09T11:25:13Z",
//     type: "liked",
//     post_id: "abc3",
//     originator: "bill",
//   },
//   {
//     id: "n3",
//     createdAt: "2012-01-09T10:25:13Z",
//     type: "reposted",
//     post_id: "abc3",
//     originator: "bill",
//   },
// ];

const notice_container = document.getElementById("oop-notice-dd");
const notification_bubble = document.getElementById("notification_bubble");

function get_notification(n_arr) {
  notification_bubble.innerHTML = `
    <div class="absolute right-0 p-1 bg-red-400 rounded-full animate-ping"></div>
            <div class="absolute right-0 p-1 bg-red-400 border rounded-full"></div>
    `;

  notice_container.innerHTML = "";

  n_arr.forEach((item) => {
    const element = document.createElement("li");
    element.innerHTML = `<a href="/posts/notice/${item.id}/${item.post_id}">${item.originator} ${item.type} your post</a>`;

    notice_container.append(element);

    //notice_container.innerHTML is not a functio
  });
}

const get_notice = () => {
  console.log("get_notice called");
  axios
    .get("/interact/notifications")
    .then((response) => {
      if (response.data.length > 0) {
        get_notification(response.data);
      }
    })
    .catch((err) => {
      console.log(err, err.response);
    });
};

get_notice();

setInterval(function () {
  get_notice();
}, 2000);
