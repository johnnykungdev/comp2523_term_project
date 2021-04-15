interface IComment {
  id: string;
  message: string;
  username: string;
  createdAt: string;
  replies?: IComment[];
}

export default IComment;
