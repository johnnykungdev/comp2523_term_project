$(document).ready(function () {
  // Grey out features
  if (window.location.pathname.includes("/iframe/")) {
    $(".oop_search").addClass("grey_out");
    $(".oop_header_right_items").addClass("grey_out");
    $(".oop-dd-btn").addClass("grey_out");
    $(".oop-notice-btn").addClass("grey_out");
    $(".oop-profile-btn").addClass("grey_out");
  }

  if (window.location.pathname.includes("/iframe/post/")) {
    $(".oop_remove_post").remove();
    $(".oop_repost_btn").addClass("grey_out");
  }

  // Create new post
  $(document).on("submit", "#oop_post_form", function (e) {
    e.preventDefault();
    const oop_post_id = Math.floor(Math.random() * 100000);
    const oop_post_content = $(this).children(".oop_post_content").val();
    const oop_post_str = createPost(oop_post_content, oop_post_id);
    // const json = JSON.stringify({ oop_post_content: oop_post_content });

    axios
      .post("/iframe/post", {
        oop_post_content: oop_post_content,
        oop_post_id: oop_post_id,
      })
      .then((response) => {
        $("#posts").prepend(oop_post_str);
      })
      .catch((err) => {
        console.log(err, err.response);
      });
  });

  // Add like
  $(document).on("click", ".oop_like_heart", function () {
    console.log("oop_like_heart clicked");
    $(this).parent().toggleClass("liked");

    let like_str = "";
    let nlikes;
    if ($(this).parent().hasClass("liked")) {
      console.log($(this).siblings(".nlikes").text());
      nlikes = parseInt($(this).siblings(".nlikes").text()) + 1;
      $(this).siblings(".nlikes").text();
      like_str = `<i class='oop_like_heart fa fa-heart fa-lg mr-2'></i><p class='nlikes'>${nlikes}</p></button>`;
    } else {
      nlikes = parseInt($(this).siblings(".nlikes").text() - 1);
      like_str = `<i class='oop_like_heart fa fa-heart-o fa-lg mr-2'></i><p class='nlikes'>${nlikes}</p></button>`;
    }

    $(this).parent().html(like_str);
  });

  // Repost
  $(document).on("submit", ".oop_repost_form", function (e) {
    e.preventDefault();

    let origin_post = $(this).closest(".post_content").prop("outerHTML");

    const repost_time = new Date();

    const open_string = `<div class="oop_repost"><h2>Guest_user reposted at ${repost_time} &nbsp; </h2><div class="post_content flex bg-gray-100 mb-4 rounded-lg ml-10">`;

    let repost_string = open_string + origin_post + "</div></div>";

    $("#posts").prepend(repost_string);
  });

  // Update comment number once added
  function update_cmt_n() {
    const cmt_number = $(".oop_comment").length;
    $("#n_cmts p").text(cmt_number);
  }

  // Add comment
  $("#comment_submit").on("click", () => {
    let cmt = $("#comment_textarea").val();

    console.log("eeee");
    console.log(cmt);
    let cmt_string = `
                        <div class="oop_comment w-full h-34 mt-3">
                  <div class="flex items-center dark:bg-gray-800">
                    <div class="text-black dark:text-gray-200 p-4 antialiased flex max-w-lg">
                      <img class="rounded-full h-8 w-8 mr-2 mt-1 " src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"/>
                      <div>
                        <div class="rounded-3xl bg-white px-4 pt-2 pb-2.5">
                          <div class="font-semibold text-sm leading-relaxed">User_Guest</div>
                          <div class="text-normal leading-snug md:leading-normal"
                          >${cmt}</div>

                          <button id="<%= comment.id %>" class=" reply_form_button bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" 
                            > Reply</button>

                          <form class="hidden comment_reply <%= comment.id %>" >
                            <textarea class="reply_comment_textarea w-full mt-2.5 bg-gray-100" name="replyText" placeholder='Type Your reply'></textarea>
                            <input type="text" hidden name="poster_username" value="<%= post.username %>">
                            <input type="text" hidden name="comment_id" value="<%= comment.id %>">
  
                            <button type="submit" class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                            > Submit</button>
                          </form>
                    
                        </div>
                      </div>
                    </div>
                    </div>
                </div>
        `;
    $("#comments_wrapper").append(cmt_string);
    $("#comment_textarea").val("");
    update_cmt_n();
  });

  // Add display form
  $(document).on("click", ".reply_form_button", function () {
    $(this).siblings(".comment_reply").toggleClass("hidden");
  });

  // Add reply
  $(document).on("submit", ".comment_reply", function (e) {
    e.preventDefault();
    let reply = $(this).children(".reply_comment_textarea").val();

    let reply_string = `
                <div class="w-full h-34 mt-3">
                  <div class="flex items-center justify-end dark:bg-gray-800">  
                    <div class="text-black dark:text-gray-200 p-4 antialiased flex max-w-lg">
                      <img class="rounded-full h-8 w-8 mr-2 mt-1 " src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"/>
                      <div>
                        <div class="rounded-3xl bg-white px-4 pt-2 pb-2.5">
                          <div class="font-semibold text-sm leading-relaxed">Guest_user </div>
                          <div class="text-normal leading-snug md:leading-normal"
                          > ${reply}</div>
                        </div>
                      </div>
                    </div>
                    </div>
                </div>
        `;

    $(this).closest(".oop_comment").append(reply_string);

    $(this).children(".reply_comment_textarea").val("");
    $(this).addClass("hidden");
  });

  // remove repost
  $(document).on("click", ".oop_remove_post", function (e) {
    console.log($(this).closest(".oop_repost").length);
    if ($(this).closest(".oop_repost").length != 0) {
      $(this).closest(".oop_repost").remove();
    } else {
      $(this).closest(".post_content").remove();
    }
  });
});
