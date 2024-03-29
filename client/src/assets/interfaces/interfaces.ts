export interface Posts {
  id: number;
  title: string;
  text: string;
  genre: string;
  isPrivate: boolean;
  createDate: string;
  author: Author;
}

export interface Author {
  id: number;
  email: string;
  password: string;
  posts: string;
  createDate: string;
}
