Breakdown of Work:

Example below:
March 9th (First Sprint Complete)
Sara Wasim:
I worked on the following tasks:

1. Search User - This task is responsible for finding a specific user.
2. Search Post - This task is responsible for finding a keyword in any users posts.
3. Like/Unlike Post - This task is responsible for liking and unliking posts.
4. Follow/Unfollow User - This task is responsible for following and unfollowing users.
5. Repost Post - This task is responsible for reposting a post on a users main feed. I attempted this task but failed, Sean had to finish it up.

I also needed to research on Youtube and Google the following things:

1. https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
2. https://stackoverflow.com/questions/61915778/how-to-send-value-from-controller-to-ejs-without-reloading-page-nodejs
3. https://stackoverflow.com/questions/36710923/how-to-submit-a-form-without-refresh-in-node-js-and-ejs
4. 

Johnny Kung:
I worked on the following tasks:

1. <Create Posts> - Wrote the route, create post service with database helper that allows users to make posts.
2. <Delete Posts> - Modified the route, delete service with database helper that allows users to delete posts.
3. <Create Comment> - Wrote the route, create comment service with database helper that allows users to add comment to the post.
4. <Integration with Firebase (database)> - Transferred connection with fake database to Firebase real-time database. Integrated Firebase in creating posts and create comments. Please check the branch: feat/firebase-integration.

The documentation used for references are:
1. https://firebase.google.com/docs/database



Sean Luo:
I worked on the following tasks:
1. <Login and Register feature> - Integrate with passportJs, and used redis caching for production 
2. <Completed displaying Posts> - Displaying posts at /posts page
3. <refactored ejs> - to use partials at "src/areas/_ejs_partials"
4. <db integration> - With Mongodb and MySQL(Used sequelizer). Located on branch "sean" (see https://github.com/kjohnathan/comp2523_term_project/blob/sean/README.md)
    - SOLID principle of polymorphism demonstrated to allow switching of databases.
6. <Completed the Repost feature> - The retweet feature started off by Sara
7. <front-page demo> - iframe on login and register page
8. <researched websocket> - tried to use websocket for notification, but failed as I realized that connection won't persist across multiple pages application.

