import { APIConnectionHandler } from "./APIConnectionHandler";
import { Observable } from "rxjs";
import { ResourceId } from "../types/Resources";

export interface ResourceManager<T> {
    connection: APIConnectionHandler;

    list(): Observable<Object>;
    
    details(id: ResourceId): Observable<T>;
    
    create(body: T): Observable<Object>;
    
    update(id: ResourceId, body: T): Observable<Object>;
    
    delete(id: ResourceId): Observable<Object>;
}