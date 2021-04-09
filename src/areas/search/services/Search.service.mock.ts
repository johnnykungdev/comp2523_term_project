import { database } from "../../../model/fakeDB";


export class MockSearchService {
  private _db = database.users;

  getFullName(user: object): string {
    return (user["firstName"] + " " + user["lastName"]).toLowerCase()
  }

  getUsersByName(userName: string): object[] {
    return this._db.filter(user => this.getFullName(user).includes(userName.toLowerCase()))
  }

  getUserById(id: string): object {
    return this._db.find(user => user.id === id)
  }

  getUserPostsByKeyWord(keyWord: string): object {
    const userPosts = []
    for (const dbUser of this._db) {
      const user = {}
      user["name"] = dbUser["firstName"] + " " + dbUser["lastName"]
      const messageList = []
      for (const post of dbUser.posts) {
        if ((post.message).toLowerCase().includes(keyWord.toLowerCase())) {
          messageList.push(post.message)
        }
      }
      if (messageList.length > 0) {
        user["posts"] = messageList
        userPosts.push(user)
      }
    }
    return userPosts
  }
}
