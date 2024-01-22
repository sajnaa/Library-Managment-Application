export interface Books {
    id: number;
    authorName: string;
   title: string;
   description:string;
userId:number;
status:string;
users:any,
userName?:string
  }
  export interface DeleteResponse {
    success: boolean;
    message?: string;
  }