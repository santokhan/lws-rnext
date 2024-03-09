export default function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    } else {
        // Trim the text to the maximum length and append an ellipsis
        return text.slice(0, maxLength) + '...';
    }
}

// Example usage
// const originalText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
// const maxLength = 20;
// const truncatedText = truncateText(originalText, maxLength);
// console.log(truncatedText); // Output: "Lorem ipsum dolor si..."
