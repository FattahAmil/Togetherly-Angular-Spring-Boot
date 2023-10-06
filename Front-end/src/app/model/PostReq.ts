import { FileHandle } from "./FileHandle";
import { User } from "./User";

export interface PostReq{
    id:string,
    content:string,
    isEvent:boolean,
    user:User,
    mediaList:FileHandle[]
}