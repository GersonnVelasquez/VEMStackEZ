export class Token {
    access_token: string;
    token_type: string;
    expires_in: string;

    constructor(item: Token) {
        this.access_token = item.access_token;
        this.token_type = item.token_type;
        this.expires_in = item.expires_in;
    }
}