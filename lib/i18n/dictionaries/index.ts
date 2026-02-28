import { en } from "./en"
import { cs } from "./cs"

export type Locale = "en" | "cs"
export type Dictionary = typeof en

export const dictionaries = {
    en,
    cs,
}
