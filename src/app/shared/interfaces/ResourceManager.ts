import { Observable } from "rxjs";
import { ResourceId } from "../types/Resources";
import { HttpClient } from "@angular/common/http";

export interface ResourceManager<T> {
    http: HttpClient;

    list(): Observable<Object>;
    
    details(id: ResourceId): Observable<T>;
    
    create(body: T): Observable<Object>;
    
    update(id: ResourceId, body: T): Observable<Object>;
    
    delete(id: ResourceId): Observable<Object>;
}