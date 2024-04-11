// Purpose: Check if a URL is valid. This is a simple function that uses the URL constructor to check if a URL is valid. It returns true if the URL is valid and false if it is not. This function is used in the shortener component to check if the URL entered by the user is valid. If the URL is not valid, the user is shown an error message.

export function isValid(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
}
