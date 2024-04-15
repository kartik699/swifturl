// Purpose: This functions uses a regular expression to check if the domain name is valid. This function is used in the shortener component to validate the URL entered by the user before shortening it.

export function isValid(url: string): boolean {
    // checks for .com, .org, .net, .io, etc.
    const regex = new RegExp(
        /^(?:(ftp|http|https)?:\/\/)?(?:[\w-]+\.)+([a-z]|[A-Z]|[0-9]){2,6}$/gi
    );

    if (regex.test(url)) {
        return true;
    }

    return false;
}
