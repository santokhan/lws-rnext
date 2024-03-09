export const API_URL = "http://localhost:3000";

export function srcURL(prefix = "", path) {
    const url = API_URL + prefix + path;
    return url;
}

export function thumbnailURL(fileName) {
    const url = API_URL + "/uploads/blog/" + fileName;
    return url;
}

export function avatarURL(fileName) {
    const url = API_URL + "/uploads/avatar/" + fileName;
    return url;
}
