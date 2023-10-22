export interface IServerResponse<T> {
    success: boolean; 
    status: number; 
    code: string; 
    message: string; 
    path: string;
    data: T | undefined;
    timestamp: string
}