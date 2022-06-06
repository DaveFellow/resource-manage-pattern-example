import { HttpResponse } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";
import { APIConnectionHandler } from "../interfaces/APIConnectionHandler";
import { APIConnectionResponseBody } from "../interfaces/APIConnectionResponse";
import { RequestProcessor } from "../interfaces/RequestProcessor";
import { ResourceManager } from "../interfaces/ResourceManager";
import { RequestResponse } from "../types/Requests";
import { ResourceId } from "../types/Resources";
import { ResourceStatusManager } from "./ResourceStatus";

export abstract class BaseResource<T> implements ResourceManager<T>, RequestProcessor {
    private name: string = '';

    public readonly status: ResourceStatusManager = new ResourceStatusManager;

    constructor(public connection: APIConnectionHandler) {}

    list(): Observable<T[]> {
        const url: string = `${this.name}/list`;
        const request: Observable<RequestResponse<T>> = this.connection.get<T>(url);

        return this.pipeRequest(request, 'list').pipe(
            map(response => (<HttpResponse<T[]>>response).body as T[])
        );
    }
    
    
    details(id: ResourceId): Observable<T> {
        const url: string = `${this.name}/details/${id}`;
        const request: Observable<RequestResponse<T>> = this.connection.get<T>(url);

        return this.pipeRequest(request, 'details').pipe(
            map(response => (<HttpResponse<T>>response).body as T)
        );
    }
    
    
    create(body: Partial<T>): Observable<APIConnectionResponseBody> {
        const url: string = `${this.name}/create`;
        const request: Observable<RequestResponse<T>> = this.connection.post<T>(url, body as Object);

        return this.pipeRequest(request, 'create').pipe(
            map(response => (<HttpResponse<APIConnectionResponseBody>>response).body as APIConnectionResponseBody)
        );
    }
    
    
    update(id: ResourceId, body: Partial<T>): Observable<APIConnectionResponseBody> {
        const url: string = `${this.name}/update/${id}`;
        const request: Observable<RequestResponse<T>> = this.connection.put<T>(url, body as Object);

        return this.pipeRequest(request, 'update').pipe(
            map(response => (<HttpResponse<APIConnectionResponseBody>>response).body as APIConnectionResponseBody)
        );
    }
    
    
    delete(id: ResourceId): Observable<APIConnectionResponseBody> {
        const url: string = `${this.name}/delete/${id}`;
        const request: Observable<RequestResponse<T>> = this.connection.delete<T>(url);

        return this.pipeRequest(request, 'delete').pipe(
            map(response => (<HttpResponse<APIConnectionResponseBody>>response).body as APIConnectionResponseBody)
        );
    }


    pipeRequest<T>(request: Observable<RequestResponse<T>>, actionName: string = ''): Observable<unknown> {
        this.status.setLoading(actionName);

        return request.pipe(
            map((response: RequestResponse<T>) => {
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

    public getName(): string {
        return this.name;
    }

    protected setName(name: string): void {
        this.name = name;
    }
}