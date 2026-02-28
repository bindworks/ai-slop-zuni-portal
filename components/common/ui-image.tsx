import Image, { ImageProps } from "next/image"
import { prefixPath } from "@/lib/prefix-path"

export function UiImage({ src, ...props }: ImageProps) {
    const prefixedSrc = typeof src === 'string' ? prefixPath(src) : src;

    return <Image src={prefixedSrc} {...props} />
}
