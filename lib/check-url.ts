// Purpose: This functions uses a regular expression to check if the domain name is valid. This function is used in the shortener component to validate the URL entered by the user before shortening it.

export function isValid(url: string): boolean {
    // checks for .com, .org, .net, .io, etc.
    // [-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@%_\+.~#?&//=]*) <- TODO: test this
    const regex = new RegExp(/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}$/i);

    if (regex.test(url)) {
        return true;
    }

    return false;
}
