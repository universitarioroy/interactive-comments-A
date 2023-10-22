export interface comment{
  id:number,
  content:string,
  createdAt:string,
  createdAtDate?:String,
  score:number,
  replyingTo?:string,
  user:{
    image:{
      png:string,
      webp:string
    },
    username:string
  },
  replies?:  comment[]
}
