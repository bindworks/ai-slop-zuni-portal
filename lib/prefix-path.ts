export function prefixPath(path: string): string {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    // If path is empty, already absolute (contains ://), or doesn't start with /
    if (!path || path.includes('://') || !path.startsWith('/')) {
        return path;
    }

    // If path already starts with basePath, don't double-prefix
    if (basePath && path.startsWith(basePath)) {
        return path;
    }

    return `${basePath}${path}`;
}
