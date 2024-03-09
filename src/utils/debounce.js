export default function debounce(func, time) {
    let timeoutId;

    return function debounceFunction(...args) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func(...args);
        }, time);
    }
}
