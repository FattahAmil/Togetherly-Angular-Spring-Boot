import { FileHandle } from "./FileHandle";

export interface Post{
    content:string,
    isEvent:boolean,
    id:string,
    mediaList:FileHandle[]
}