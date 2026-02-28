import { Link, LinkProps } from "react-router-dom"

interface UiLinkProps extends Omit<LinkProps, 'to'> {
    href: string
}

export function UiLink({ href, ...props }: UiLinkProps) {
    // React Router Link handles basename automatically via BrowserRouter context.
    // We should not manually prefix internal routes here to avoid double-prefixing.
    return <Link to={href} {...props} />
}
