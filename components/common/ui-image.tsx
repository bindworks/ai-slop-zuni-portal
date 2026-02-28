import { prefixPath } from "@/lib/prefix-path"
import { ImgHTMLAttributes } from "react"

export function UiImage({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
    const prefixedSrc = typeof src === 'string' ? prefixPath(src) : src;

    // eslint-disable-next-line @next/next/no-img-element
    return <img src={prefixedSrc} alt={alt} {...props} />
}
