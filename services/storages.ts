export const getToken = (key: string) : string | null=> {
    return localStorage.getItem(key)
}