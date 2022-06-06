import { APISession } from "./APISession";
import { RequestHandler } from "./RequestHandler";
import { RequestProcessor } from "./RequestProcessor";

export interface APIConnectionHandler extends RequestHandler, RequestProcessor {
    readonly baseUrl: string;

    getSession?(): APISession;

    setSession?(sessionData: APISession): void;

    clearSession?(): void;
}