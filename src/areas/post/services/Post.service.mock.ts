import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import IUser from '../../../interfaces/user.interface'
import admin from '../../../model/firebase'
import { findOne, fbObjectToArray, insertOne } from '../../../model/firebase.helper'
import { DbHelper } from "model/helpers/dbHelper";

// ❗️ Implement this class much later, once everything works fine with your mock db
export class MockPostService implements IPostService {
  private _database: any
  constructor() {
    this._database = admin.database()
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
    const userPosts = fbObjectToArray(user.posts)
    userPosts.forEach(post => {
      const oldCommentList = post.commentList
      post.commentList = fbObjectToArray(oldCommentList)
    })

    userPosts.forEach(post => allPosts.push(post))

    const followedUsers = fbObjectToArray(user.following)
    const getFollowedUsers = async () => {
      
      const followedUsersInfo = await Promise.all(followedUsers.map(async (followedUserId) => {
        const result = await findOne(userRef, { queryType: "id", condition: followedUserId })
        const followedUser = result[Object.keys(result)[0]]
        return followedUser
      }))
      return followedUsersInfo
    }
    const followedUsersObject = await getFollowedUsers()

    followedUsersObject.forEach((followedUser:IUser) : void => {
      const followedUserPosts = fbObjectToArray(followedUser.posts)
      followedUserPosts.forEach((userPost: IPost) => {
        userPost.commentList = fbObjectToArray(userPost.commentList)
        allPosts.push(userPost)
      })
    })

    allPosts.sort(function (a: any, b: any) {
      if (new Date(a.createdAt) > new Date(b.createdAt)) {
        return -1
      } else {
        return 1
      }
    })
    return allPosts
  }
  findById(id: string): IPost {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
  addCommentToPost(message: { id: string; createdAt: string; userId: string; message: string }, postId: string): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  sortPosts(posts: IPost[]): IPost[] {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  buildNewPost(req: Request) {
    return {
      id: new Date().getTime(),
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
}
