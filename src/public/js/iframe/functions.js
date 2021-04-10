function createPost(msg, id) {
  let time = new Date();
  let post_str = `    <div class="post_content flex bg-gray-100 mb-4 rounded-lg">


      <div class="w-1/8 text-right pl-3 pt-3">
        <div>
          <a href="#"
            ><img
              src="https://user-images.githubusercontent.com/76543451/103982284-0a6f0b00-5138-11eb-872b-0b9e70fc5c25.gif"
              alt="avatar"
              class="rounded-full h-12 w-12 mr-2"
          /></a>
        </div>
      </div>

      <div class="w-7/8 p-3 pl-0">
        <!-- <div class="text-xs text-grey-dark">Reposted</div> -->
        <div class="flex justify-between">
          <div>
            <span class="font-bold"><a href="#" class="text-black">Guest_User</a></span>
  

            <span class="text-grey-dark">${time}</span>


          </div>
        </div>
        <div>
          <div class="mb-4">
            <p class="post_message mb-6">${msg}</p>
          </div>
          <div class="pb-2 flex">
            <span class="mr-8"
              ><a
                href="/iframe/post/${id}"
                id="n_cmts"
                class="text-grey-dark hover:no-underline hover:text-blue-light flex"
                ><i class="fa fa-comment fa-lg mr-2"></i>
                <p>0</p>
              </a></span
            >
            <span class="mr-8">
              <!-- <form action="/interact/repost" method="post"> -->
              <form class="${id} oop_repost_form">
                <!-- <input hidden class="oop_post_username" type="text" name="username" value="Guest_User" />
                <input hidden class="oop_post_id" type="text" name="post_id" value="${id}" /> -->

                <button
                  class="oop_repost_btn text-pink-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  style="transition: all 0.15s ease"
                  type="submit"
                >
                  <i class="fa fa-retweet fa-lg mr-2"></i> <span class="repost_n">0</span>
                </button>
              </form>
            </span>
            <span class="likes mr-8">
              <button class="flex">
                <i class="oop_like_heart fa fa-heart-o fa-lg mr-2"></i>
                <p class="nlikes">0</p>
              </button>
            </span>
          </div>
        </div>
      </div>


    </div>`;

  return post_str;
}
