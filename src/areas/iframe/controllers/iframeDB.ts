import IDatabase from "../../../interfaces/database.interface.ts";

// Please feel free to not use this, or completely change it to your liking. It is just an example.
const database: IDatabase = {
  users: [
    {
      id: "3",
      username: "guest_user",
      email: "guest_user@gmail.com",
      password: "guest_user",
      firstName: "guest_user",
      lastName: "guest_user",
      posts: [
        {
          id: "abc3",
          username: "guest_user",
          userId: "guest_user",
          message: "A post by guest_user",
          createdAt: new Date(),
          likes: 30,
          reposts: 50,
          comments: 12,
          commentList: [
            {
              username: "guest_user",
              id: "abc4",
              createdAt: "2012-01-05T04:13:24Z",
              userId: "billgates",
              message: "Cool post guest_user. Glad I decided to follow you.",
            },
          ],
        },
        {
          id: "abc5",
          userId: "guest_user",
          username: "guest_user",
          message: "Nice weather today in Vancouver",
          createdAt: new Date(),
          likes: 30,
          reposts: 50,
          comments: 12,
          commentList: [
            {
              id: "abc6",
              username: "guest_user",
              userId: "billgates",
              createdAt: "2012-02-05T05:13:24Z",
              message: "The weather is always nice when you're rich like me.",
            },
          ],
        },
      ],
      following: [],
      reposts: [],
    },
  ],
};

export { database };
