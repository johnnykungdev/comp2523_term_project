import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import IUser from '../../../interfaces/user.interface'
import admin from '../../../model/firebase'
import { findOne, fbObjectToArray } from '../../../model/firebase.helper'

// ❗️ Implement this class much later, once everything works fine with your mock db
export class MockPostService implements IPostService {
  private _database: any
  constructor() {
    this._database = admin.database()
  }

  async addPost(post: IPost, username: string): Promise<void> {
    // 🚀 Implement this yourself.
    const ref = this._database.ref("users/posts")
    await ref.push(post)
    console.log('123')
  }

  deletePost(postId: string) {
    
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

    console.log(userPosts)
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
    console.log("followedUsersObject", followedUsersObject)

    followedUsersObject.forEach((followedUser:IUser) : void => {
      console.log("followedUser", followedUser)
      const followedUserPosts = fbObjectToArray(followedUser.posts)
      console.log(followedUserPosts)
      followedUserPosts.forEach((userPost: IPost) => {
        userPost.commentList = fbObjectToArray(userPost.commentList)
        allPosts.push(userPost)
      })
    })

    allPosts.sort(function (a: any, b: any) {
      if (new Date(a.createdAt) > new Date(b.createdAt)) {
        return 1
      } else {
        return -1
      }
    })
    console.log("allPosts", allPosts)
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
}
