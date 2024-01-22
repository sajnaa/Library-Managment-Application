export interface User {
  id?: number;
  username: string;
  password: string;
  role: string;
  books:any;
}
export interface Transaction {
 id: number;
  userId: number;
  bookTitle: string; 
}
 