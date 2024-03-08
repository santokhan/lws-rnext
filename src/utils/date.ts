export function formatDate(dateString: string): string {
    // Create a Date object from the input string
    const date = new Date(dateString);

    // Define options for formatting the date
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    };

    // Format the date using the toLocaleDateString() method
    return date.toLocaleDateString('en-US', options);
}

// // Example usage
// const dateString = '2023-01-20T00:00:00'; // Example date string
// const formattedDate = formatDate(dateString);
// console.log(formattedDate); // Output: "20 Jan, 2023"
