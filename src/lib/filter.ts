// By default object includes {"key" : "value"} type
export type Item = { [key: string]: any };

export const filterByTitleValue = <T extends Item>(
    array: T[], // array of objects
    key: keyof T, // key of object ['title', 'author', 'price']
    // value: T[keyof T] // object['title'] 
    value: string // object['title'] 
): T[] => {
    return array.filter(book => {
        if (typeof book[key] === 'string') {
            return book[key].toLowerCase().includes(value.toLowerCase().trim())
        } else {
            return false
        }
    });
};
