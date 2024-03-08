type Func<T extends unknown[]> = (...args: T) => void;

export default function debounce<T extends unknown[]>(func: Func<T>, time: number): Func<T> {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function debounceFunction(...args: T) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func(...args);
        }, time);
    }
}