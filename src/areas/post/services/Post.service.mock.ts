import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import { DbHelper } from "../../../model/helpers/dbHelper";
import IUser from "../../../interfaces/user.interface";


// ⭐️ Feel free to change this class in any way you like. It is simply an example...
export class MockPostService implements IPostService {

  private getGroupPosts(user_group): IPost[] {
    let allPosts: IPost[] = [];
    for (let user of user_group) {
      allPosts.push(...user.posts);
    }

    console.log("getGroupPosts all posts");
    console.log(allPosts);

    return allPosts;
  }

  private getFollowedPosts(username) {
    const followed_users_names: string[] = DbHelper.select([{ username: username }])[0].following;
    console.log('followed_users_names');
    console.log(followed_users_names);
    
    let followed_users: IUser[] = [];

    if (followed_users_names.length != 0) {
      for (let name of followed_users_names) {

        let each_followed_user = DbHelper.select([{ username: name }])[0];

        followed_users.push(each_followed_user);
      }

      return this.getGroupPosts(followed_users);
    }

    return [];
  }


  addPost(post: IPost, userId: string): void {
    //db helper, can switch to real db services later
    DbHelper.insertPost(userId, post)

    // throw new Error("Method not implemented.");
  }
  getAllPosts(username: string): IPost[] {
    // 🚀 Implement this yourself.

    console.log("getAllPosts " + username);
    let merged_posts = [];
    const user = DbHelper.select([{ username: username }]);
    const ownposts = user[0].posts;
    const followed_posts = this.getFollowedPosts(username);

    merged_posts.push(...ownposts, ...followed_posts);

    merged_posts.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });

    return merged_posts;
  }

  findById(id: string): IPost {
    // 🚀 Implement this yourself.
    console.log(id)
    return DbHelper.findOne({ type: "posts", conditionType: "id", condition: id})
  }
  addCommentToPost(comment: { id: string; createdAt: string; userId: string; message: string }, postId: string): void {
    // 🚀 Implement this yourself.
    DbHelper.insertOne({type: "posts", conditionType: "id", condition: postId}, {type: "commentList", newContent: comment})
  }

  sortPosts(posts: IPost[]): IPost[] {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  buildNewPost(req: Request) {
    return {
      id: `${(Math.random() * 100000000).toFixed(0)}`,
      userId: req.user.id,
      username: req.user.username,
      message: req.body.postText,
      createdAt: new Date(),
      commentList: [],
      likes: 0,
      reposts: 0,
      comments: 0
    }
  }

  deletePost(userId: string, postId: string) {
    DbHelper.deletePost(userId, postId)
  }
}
