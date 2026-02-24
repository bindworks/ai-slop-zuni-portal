export interface VisitImage {
    id: number | string
    tag: string
    src: string
}

export type TissueColor = 'red' | 'yellow' | 'black' | 'pink'

export interface TissueSegment {
    label: string
    value: number
    color: string
}

export interface WoundDetails {
    measurements: {
        length: string
        width: string
        depth: string
        area: string
        tissues?: TissueSegment[]
    }
    woundState: Record<string, string>
    diagnosis: Record<string, string>
    materials: Record<string, string>
    clinicalNotes: string
    doctor: string
    time: string
    camera: string
}

export interface Visit {
    date: string
    label: string
    summary: string
    images: VisitImage[]
    details: WoundDetails
}

export interface Photo {
    id: string | number
    src: string
    caption: string
}

export interface DateGroup {
    date: string
    photos: Photo[]
}

export interface Document {
    id: string
    title: string
    category: string
    dateIssued: string
    datePhoto: string
    thumbnail: string
    url?: string
    summary: string
}

export interface Patient {
    id: string
    name: string
    mrn: string
    dob: string
    age: number
    gender: string
    lastVisit: string
    status: "Improving" | "Stable" | "Worsening"
    diagnoses: string[]
    woundCount: number
    wounds: WoundSummary[]
}

export interface WoundSummary {
    id: string
    label: string
    type: string
    status: string
    date: string
    imageCount: number
    history: Visit[]
}
export interface Institution {
    id: string
    name: string
    type: 'institution'
}

export interface Area {
    id: string
    name: string
    type: 'area'
    institutions: Institution[]
}
