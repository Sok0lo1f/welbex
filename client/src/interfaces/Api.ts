export interface IApi<T> {
    page: number
    pages: number
    data: T[]
}