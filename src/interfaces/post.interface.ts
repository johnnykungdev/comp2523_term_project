import IComment from "./comment.interface";

interface IPost {
  id: string | number;
  message: string;
  userId: string;
  username: string;
  createdAt: Date;
  commentList?: Array<IComment>;
  likes: number;
  reposts: number;
  comments: number;
}

export default IPost;
