import { HttpClient, HttpResponse } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";
import { APIConnectionResponseBody } from "../interfaces/APIConnectionResponse";
import { RequestProcessor } from "../interfaces/RequestProcessor";
import { ResourceManager } from "../interfaces/ResourceManager";
import { ResourceId } from "../types/Resources";
import { ResourceStatusManager } from "./ResourceStatus";

export abstract class BaseResource<T> implements ResourceManager<T>, RequestProcessor {
    private name: string = '';

    public readonly status: ResourceStatusManager = new ResourceStatusManager;

    constructor(public http: HttpClient) {}

    protected buildUrl = (route: string): string => `${this.name}/${route}`;

    public getName = (): string => this.name; 

    protected setName(name: string): void {
        this.name = name;
    }

    list(customRoute?: string): Observable<T[]> {
        const url: string = this.buildUrl(customRoute || 'list');
        const request: Observable<Object> = this.http.get(url);

        return this.pipeRequest(request, 'list').pipe(
            map(response => (<HttpResponse<T[]>>response).body as T[])
        );
    }
    
    
    details(id: ResourceId, customRoute?: string): Observable<T> {
        const url: string = this.buildUrl(`${customRoute}/${id}` || `details/${id}`);
        const request: Observable<Object> = this.http.get(url);

        return this.pipeRequest(request, 'details').pipe(
            map(response => (<HttpResponse<T>>response).body as T)
        );
    }
    
    
    create(body: Partial<T>, customRoute?: string): Observable<APIConnectionResponseBody> {
        const url: string = this.buildUrl('create');
        const request: Observable<Object> = this.http.post(url, body);

        return this.pipeRequest(request, 'create').pipe(
            map(response => (<HttpResponse<APIConnectionResponseBody>>response).body as APIConnectionResponseBody)
        );
    }
    
    
    update(id: ResourceId, body: Partial<T>, customRoute?: string): Observable<APIConnectionResponseBody> {
        const url: string = this.buildUrl(`${customRoute}/${id}` || `update/${id}`);
        const request: Observable<Object> = this.http.put(url, body);

        return this.pipeRequest(request, 'update').pipe(
            map(response => (<HttpResponse<APIConnectionResponseBody>>response).body as APIConnectionResponseBody)
        );
    }
    
    
    delete(id: ResourceId, customRoute?: string): Observable<APIConnectionResponseBody> {
        const url: string = this.buildUrl(`${customRoute}/${id}` || `delete/${id}`);
        const request: Observable<Object> = this.http.delete(url);

        return this.pipeRequest(request, 'delete').pipe(
            map(response => (<HttpResponse<APIConnectionResponseBody>>response).body as APIConnectionResponseBody)
        );
    }


    pipeRequest<T>(request: Observable<Object>, actionName: string = ''): Observable<unknown> {
        this.status.setLoading(actionName);

        return request.pipe(
            map(response => {
                const httpResponse = response as HttpResponse<T>;
                this.status.setSuccess(actionName);
                return httpResponse.body;
            }),
            catchError((err, response) => {
                console.error(response);
                this.status.setError(actionName);
                throw err;
            })
        );
    }
}