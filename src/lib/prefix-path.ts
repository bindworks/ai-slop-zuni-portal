export function prefixPath(path: string): string {
    // Vite provides BASE_URL which defaults to '/'
    // If it's just '/', we don't want to prepend it to paths starting with '/' to avoid '//'
    const baseUrl = import.meta.env.BASE_URL;
    const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

    // If path is empty, already absolute (contains ://), or doesn't start with /
    if (!path || path.includes('://') || !path.startsWith('/')) {
        return path;
    }

    // If path already starts with base, don't double-prefix
    if (base && path.startsWith(base)) {
        return path;
    }

    return `${base}${path}`;
}
