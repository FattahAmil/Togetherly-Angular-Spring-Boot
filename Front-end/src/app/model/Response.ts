export class Response {
    body!: {
        access_token: string;
        refresh_token: string;
    }; 

    statusCode!: string;
    statusCodeValue!: number;
}
