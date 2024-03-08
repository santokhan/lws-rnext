export const API_URL = "http://localhost:3000";

// check static source path from api\main.js line number: 13
export function srcURL(prefix: string = "", path: string) {
    const url = API_URL + prefix + path;
    return url;
}

export function thumbnailURL(fileName: string) {
    const url = API_URL + "/uploads/blog/" + fileName;
    return url;
}

export function avatarURL(fileName: string) {
    const url = API_URL + "/uploads/avatar/" + fileName;
    return url;
}