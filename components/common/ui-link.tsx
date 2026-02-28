import Link, { LinkProps } from "next/link"
import { prefixPath } from "@/lib/prefix-path"
import { ReactNode } from "react"

interface UiLinkProps extends LinkProps {
    children: ReactNode
    className?: string
    target?: string
    rel?: string
    title?: string
}

export function UiLink({ href, ...props }: UiLinkProps) {
    return <Link href={href} {...props} />
}
