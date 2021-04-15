import IComment from "./comment.interface";

interface IPost {
  id: string;
  message: string;
  username: string;
  createdAt: string;
  commentList?: Array<IComment>;
  likes: string[];
  reposts: number;
}

export default IPost;
