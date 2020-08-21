import { User } from "./User";

export interface Jwt
{
    log:boolean,
    status:string,
    user:User,
    token:string,
}
