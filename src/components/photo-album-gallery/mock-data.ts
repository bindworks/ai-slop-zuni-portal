import { DateGroup } from "../common/types"
import { photoPool } from "../common/constants"

export const photoGroups: DateGroup[] = [
    {
        date: "2026-02-18",
        photos: [
            { id: "P-001", src: photoPool[0], caption: "Patient room — morning check" },
            { id: "P-002", src: photoPool[1], caption: "Dressing after change" },
            { id: "P-003", src: photoPool[2], caption: "Supplies prepared for procedure" },
        ],
    },
    {
        date: "2026-02-11",
        photos: [
            { id: "P-004", src: photoPool[3], caption: "Compression stocking application" },
            { id: "P-005", src: photoPool[5], caption: "Physiotherapy session — ankle ROM" },
            { id: "P-006", src: photoPool[0], caption: "Room after bed adjustment" },
            { id: "P-007", src: photoPool[2], caption: "Wound care tray — sterile setup" },
        ],
    },
    {
        date: "2026-02-04",
        photos: [
            { id: "P-008", src: photoPool[1], caption: "Bandage applied post-debridement" },
            { id: "P-009", src: photoPool[4], caption: "Ward corridor — facility photo" },
            { id: "P-010", src: photoPool[5], caption: "Rehabilitation exercises" },
        ],
    },
    {
        date: "2026-01-28",
        photos: [
            { id: "P-011", src: photoPool[3], caption: "Compression therapy — left leg" },
            { id: "P-012", src: photoPool[0], caption: "Patient room — afternoon" },
        ],
    },
    {
        date: "2026-01-21",
        photos: [
            { id: "P-013", src: photoPool[2], caption: "Debridement supplies" },
            { id: "P-014", src: photoPool[1], caption: "Post-debridement dressing" },
            { id: "P-015", src: photoPool[4], caption: "Hallway to treatment room" },
            { id: "P-016", src: photoPool[5], caption: "Mobility assessment" },
            { id: "P-017", src: photoPool[0], caption: "Room setup for visit" },
        ],
    },
    {
        date: "2026-01-15",
        photos: [
            { id: "P-018", src: photoPool[3], caption: "Initial compression fitting" },
            { id: "P-019", src: photoPool[2], caption: "Initial assessment supplies" },
            { id: "P-020", src: photoPool[4], caption: "Clinic entrance" },
        ],
    },
]
