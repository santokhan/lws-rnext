// Function to convert image URL to File object
export default async function imageUrlToFile(imageUrl, fileName = 'thumbnail') {
    try {
        // Fetch image data
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        // Create File object
        const file = new File([blob], fileName, {
            type: response.headers.get('content-type') || 'image/png'
        });

        return file;
    } catch (error) {
        console.error('Error converting image URL to File:', error);
        return null;
    }
}

// Example usage
// const imageUrl = 'https://example.com/image.jpg';
// const fileName = 'image.jpg';

// imageUrlToFile(imageUrl, fileName)
//     .then(file => {
//         if (file) {
//             console.log('File created:', file);
//             // Now you can use the file object
//         } else {
//             console.log('Failed to create file.');
//         }
//     });
