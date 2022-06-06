import { Observable } from "rxjs";
import { RequestResponse } from "../types/Requests";

export interface RequestHandler {
    get<T>(route: string): Observable<RequestResponse<T>>;

    post<T>(route: string, body: Object): Observable<RequestResponse<T>>;
    
    put<T>(route: string, body: Object): Observable<RequestResponse<T>>;
    
    delete<T>(route: string): Observable<RequestResponse<T>>;
}