export type Brand<T, U> = T & { __brand: U };

export const toId = <T extends number>(id: number | string): T => +id as T;
