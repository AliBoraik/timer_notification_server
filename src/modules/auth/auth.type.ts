export type Result<T> = {
    error?:string
    data?:T
}

export type Tokens = {
    access_token:string,
    refresh_token:string
}

export type RequestBody = {
    grant_type: string,
    client_id: string,
    username?: string,
    password?: string,
    refresh_token?: string,
    client_secret: string
}
