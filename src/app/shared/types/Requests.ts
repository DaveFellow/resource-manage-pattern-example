import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { APIConnectionResponseBody } from "../interfaces/APIConnectionResponse";

export type RequestResponse<T> = HttpResponse<T | APIConnectionResponseBody> | HttpErrorResponse;