import { APISession } from "../APISession";

export interface UserSession extends APISession {
    name?: string;
    email?: string;
    token?: string;
}