interface IComment {
  id: string;
  message: string;
  username: string;
  createdAt: Date;
  replies?: IComment[];
}

export default IComment;
