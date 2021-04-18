import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import IUser from '../../../interfaces/user.interface'
import IComment from '../../../interfaces/comment.interface'
import admin from '../../../model/firebase'
import { findOne, fbObjectToArray, insertOne } from '../../../model/firebase.helper'
import { DbHelper } from "../../../model/helpers/dbHelper";
import { database } from "../../../model/fakeDB";
import { Request } from "express";

// ❗️ Implement this class much later, once everything works fine with your mock db
export class MockPostService implements IPostService {
  private _database: any
  constructor() {
    this._database = admin.database()
  }

  private getGroupPosts(user_group): IPost[] {
    let allPosts: IPost[] = [];
    for (let user of user_group) {
      allPosts.push(...user.posts);
    }

    return allPosts;
  }

  private getFollowedPosts(username) {
    const followed_users_names: string[] = DbHelper.select([{ username: username }])[0].following;

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

  repost(req: Request) {
    const repost_obj = {
      poster_username: req.body.username,
      post_id: req.body.post_id,
      repostedAt: new Date(),
    };
    const current_user = req.user as IUser;

    let reposted_post = DbHelper.recurseSelect([
      { users: { username: req.body.username } },
      { posts: { id: req.body.post_id } },
    ]);

    reposted_post.reposts++;

    // add repost object
    for (let user of database.users) {
      if (current_user.username == user.username) {
        user.reposts.push(repost_obj);

        console.log("repost success");
        return;
      }
    }

    throw new Error("user not found");
  }

  private getRepostedPosts(username) {
    console.log("getRepostedPosts " + username);

    const reposts = DbHelper.select([{ username: username }])[0].reposts;

    const post_array: IPost[] = [];
    //buidling the posts object here
    for (let r of reposts) {
      for (let u of database.users) {
        // match user
        if (r.poster_username == u.username) {
          // match post
          for (let p of u.posts) {
            if (r.post_id == p.id) {
              let p_copy = { ...p, createdAt: r.repostedAt, originalDate: p.createdAt };
              post_array.push(p_copy);
            }
          }
        }
      }
    }
    return post_array;
  }

  async addPost(post: IPost, userId: string): Promise<string | any> {
    // 🚀 Implement this yourself.
    console.log(userId)
    
    const userRef = this._database.ref("users")
    const user = await findOne(userRef, { queryType: "id", condition: Number(userId)})
    if (!user) throw new Error("User not found.")
    const userKey = Object.keys(user)
    const insertRef = this._database.ref(`users/${userKey}/posts`)
    const insertResult = await insertOne(insertRef, post)
    console.log("insertResult", insertResult)

    return insertResult
  }

  async deletePost(userId: string | number, postId: string) {
    try {
      const ref = this._database.ref("users")
      const user = await findOne(ref, { queryType: "id", condition: Number(userId)})
      const userKey = Object.keys(user)[0]
  
      const postRef = this._database.ref(`users/${userKey}/posts`)
    
      // const postRef = 
      const deletedPost = await findOne(postRef, { queryType: "id", condition: Number(postId) })
      if (deletedPost) {
        const deletedPostKey = Object.keys(deletedPost)[0]
        const deletePostRef = this._database.ref(`users/${userKey}/posts/${deletedPostKey}`)
        await deletePostRef.remove()
        return "success"
      }
    } catch(err) {
      throw `${err}`
    }
  }

  async getAllPosts(userId: string): Promise<IPost[]> {
    let allPosts = []
    const userRef = this._database.ref("users")
    let user = await findOne(userRef, { queryType: "id", condition: Number(userId)})
    if (!user) throw new Error("User not found.")
    user = user[Object.keys(user)[0]]

    const postRef = this._database.ref("posts")

    const userPosts = await findOne(postRef, { queryType: "userId", condition: Number(userId)})

    for (let post in userPosts) {
      allPosts.push(userPosts[post])
    }

    const getFollowedPosts = async (allPosts: any[]): Promise<void> => {
      let followedUsersIds = fbObjectToArray(user.following)
      const postRef = this._database.ref("posts")
      const result = await Promise.all(followedUsersIds.map(async (followedUserId) => {
        let followedUserPosts = await findOne(postRef, {queryType: "userId", condition: followedUserId})
        if (followedUserPosts) {
          followedUserPosts = fbObjectToArray(followedUserPosts)
          return followedUserPosts.forEach(p => allPosts.push(p))
        } else {
          return undefined
        }
      }))
    }

    await getFollowedPosts(allPosts)

    allPosts.sort(function (a: any, b: any) {
      if (new Date(a.createdAt) > new Date(b.createdAt)) {
        return -1
      } else {
        return 1
      }
    })

    return allPosts
  }
  
  async findById(postId: string): Promise<IPost> {
    // 🚀 Implement this yourself.
    console.log("postId", postId);
    const postRef = this._database.ref("posts")

    const result = await findOne(postRef, { queryType: "id", condition: Number(postId)});
    const post = result[Object.keys(result)[0]]
    console.log(post);
    const commentRef = this._database.ref("comments")
    const postComments = await findOne(commentRef, { queryType: "postId", condition: Number(postId)})
    let commentList = []
    if (postComments) {
      for (let comment in postComments) {
        commentList.push(postComments[comment])
      }
    }
    commentList.sort(function(a, b) {
      if (new Date(a.createdAt) > new Date(b.createdAt)) {
        return -1
      } else {
        return 1
      }
    })
    
    post.commentList = commentList
    console.log(post)
    return post
  }

  async addCommentToPost(postId, newComment) {
    // 🚀 Implement this yourself.
    try {
      const commentRef = this._database.ref("comments")
      const postRef = this._database.ref("posts")
      const post = findOne(postRef, { queryType: "id", condition: Number(postId)})
      const postKey = Object.keys(post)[0]

      await insertOne(commentRef, {id: newComment.id })
      const commentResult = await findOne(commentRef, { queryType: "id", condition: Number(newComment.id)})
      if (commentResult[Object.keys(commentResult)[0]]) {
        const commentResultKey = Object.keys(commentResult)[0]
        let currentPost = await findOne(postRef, { queryType: "id", condition: Number(postId) })
        const currentPostkey = Object.keys(currentPost)[0]
        currentPost = currentPost[currentPostkey]
      

        const updates = {}
        updates[`posts/${currentPostkey}/comments`] = currentPost.comments + 1
        updates[`comments/${commentResultKey}`] = newComment
        const ref = this._database.ref()
        ref.update(updates)
      }
    } catch(error) {
      console.log(error)
    }
  }

  sortPosts(posts: IPost[]): IPost[] {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  buildNewPost(req: Request) {
    const user = req.user as IUser;
    return {
      id: new Date().getTime(),
      userId: user.id,
      username: user.username,
      message: req.body.postText,
      createdAt: new Date(),
      commentList: [],
      likes: 0,
      reposts: 0,
      comments: 0,
    };
  }

  deleteRepost(userId: string, postId: string) {
    const user = DbHelper.select([{ id: userId }]);
    const reposts = user[0].reposts;
    console.log("repossssst");
    console.log(reposts);

    for (let i = 0; i < reposts.length; i++) {
      if (reposts[i].post_id == postId) {
        console.log(i);

        reposts.splice(i, 1);
      }
    }
  }
}
