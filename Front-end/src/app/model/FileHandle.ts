import { SafeUrl } from "@angular/platform-browser";
export interface FileHandle{
    fileName:string,
    fileSize:number,
    fileType:string,
    mediaUrl:SafeUrl,
    fileContent:string,
}