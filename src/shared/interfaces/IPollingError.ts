export interface IPollingError extends Error {
    response?: {
        statusCode?: number;
    };
}
