import { Observable } from "rxjs";
import { RequestResponse } from "../types/Requests";

export interface RequestProcessor {
    pipeRequest<T>(request: Observable<RequestResponse<T>>): Observable<unknown>;
}