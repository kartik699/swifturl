// Purpose: Correct a URL. This function takes a URL as input and returns a corrected URL. If the URL is missing the protocol, the function adds the HTTPS protocol to the URL. This function is used in the shortener component to correct the URL entered by the user before shortening it. If the URL is missing the protocol, the function adds the HTTPS protocol to the URL before shortening it.

export function correctUrl(url: string): string {
    try {
        new URL(url);
        return url;
    } catch (err) {
        return `https://${url}`;
    }
}
