export class ClientError extends Error { }
export class ServerError extends Error { }

export type ErrorResult = ClientError | ServerError
