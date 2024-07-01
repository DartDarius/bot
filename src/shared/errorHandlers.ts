export function errorHandler(error: unknown) {
    if (error instanceof Error) {
        console.error('Error message:', error.message);
    } else {
        console.error('Unknown error', error);
    }
}
