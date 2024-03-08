export default function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
        return text;
    } else {
        // Trim the text to the maximum length and append an ellipsis
        return text.slice(0, maxLength) + '...';
    }
}

// // Example usage:
// const originalText: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
// const maxLength: number = 20;
// const truncatedText: string = truncateText(originalText, maxLength);
// console.log(truncatedText); // Output: "Lorem ipsum dolor si..."
