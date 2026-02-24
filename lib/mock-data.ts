import { Visit, Patient, Area, Institution } from "@/components/common/types"

// --- Custom Seeded Random Generator ---
class SeededRandom {
    private seed: number;
    constructor(seed: number) {
        this.seed = seed;
    }
    // LCG algorithm
    next() {
        this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
        return this.seed / 4294967296;
    }
    // Returns a pseudo-random integer in [min, max]
    nextInt(min: number, max: number): number {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }

    // Returns a pseudo-random float in [0, 1)
    nextFloat(): number {
        return this.next();
    }
    pick<T>(array: T[]): T {
        return array[this.nextInt(0, array.length - 1)];
    }
}

const rng = new SeededRandom(12345);

// --- Clinical Vocabularies ---
const firstNames = ["James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
const doctors = ["Dr. Chen", "Dr. Martinez", "Dr. Wilson", "Dr. Taylor", "Dr. Gupta"];
const cameras = ["iPhone 15 Pro", "iPhone 14 Pro", "Canon EOS R5", "Nikon Z9"];

const tissueTypes = [
    { label: "Granulation", color: "red" },
    { label: "Slough", color: "yellow" },
    { label: "Necrotic", color: "black" },
    { label: "Epithelial", color: "pink" }
];

// --- Wound Images (Now with Rulers) ---
const woundImages = [
    "/wound-1.jpg",
    "/wound-2.jpg",
    "/wound-3.jpg",
];

// --- Hierarchical Areas ---
export const mockAreas: Area[] = [
    {
        id: "area-north",
        name: "North Region",
        type: "area",
        institutions: [
            { id: "inst-1", name: "St. Mary's Care Home", type: "institution" },
            { id: "inst-2", name: "Green Valley Clinic", type: "institution" },
        ],
    },
    {
        id: "area-south",
        name: "South Region",
        type: "area",
        institutions: [
            { id: "inst-3", name: "Ocean Breeze Elderly Care", type: "institution" },
            { id: "inst-4", name: "Pine Hill Rehabilitation", type: "institution" },
        ],
    },
];

// --- Data Generation Helpers ---
function generateWoundHistory(patientId: string, woundIndex: number, rng: SeededRandom): Visit[] {
    const historyLength = rng.nextInt(3, 8);
    const startDate = new Date(2025, 11, rng.nextInt(1, 28));
    const history: Visit[] = [];

    const baseWidth = rng.next() * 5 + 1;
    const baseLength = rng.next() * 5 + 1;
    const baseDepth = rng.next() * 2;
    const woundType = rng.pick(["Venous Ulcer", "Diabetic Foot Ulcer", "Pressure Injury", "Surgical Site"]);
    const woundLocation = rng.pick(["Left Lower Leg", "Right Heel", "Sacral Region", "Left Foot Dorsum", "Right Outer Thigh", "Left Forearm"]);

    for (let i = 0; i < historyLength; i++) {
        const visitDate = new Date(startDate);
        visitDate.setDate(startDate.getDate() + i * 7);
        const dateStr = visitDate.toISOString().split("T")[0];

        // Healing progress (randomized but generally decreasing)
        const progressFactor = Math.max(0.2, 1 - (i / historyLength) * 0.8 + (rng.next() - 0.5) * 0.2);
        const currentWidth = (baseWidth * progressFactor).toFixed(1);
        const currentLength = (baseLength * progressFactor).toFixed(1);
        const currentDepth = (baseDepth * progressFactor).toFixed(1);
        const currentArea = (parseFloat(currentWidth) * parseFloat(currentLength)).toFixed(2);

        // Tissues (shifts toward granulation/epithelial over time)
        const granulation = Math.floor(60 + i * 5);
        const slough = 100 - granulation;

        const assessment = rng.pick([
            `Wound bed assessment: ${granulation}% granulation, ${slough}% slough. `,
            `Visual inspection shows improving granulation (${granulation}%) with decreasing slough. `,
            `Wound margins are intact. Bed is predominantly granulation tissue (${granulation}%). `
        ]);
        const cleaning = rng.pick([
            `Irrigated extensively with normal saline. Gentle mechanical debridement performed using sterile gauze to remove loose slough and debris. `,
            `Wound cleansed with PHMB solution. Autolytic debridement ongoing. Removed devitalized tissue carefully from edges. `,
            `Cleansed with warm saline irrigation. Exudate gently wiped from surrounding skin. `,
            `Washed with hypochlorous acid wound cleanser. No sharp debridement required today. `
        ]);
        const dressing = rng.pick([
            `Applied primary alginate dressing to manage moderate exudate, covered with an absorbent foam pad, and secured with a 2-layer compression system. `,
            `Primary hydrocolloid dressing applied directly to the wound bed. Secured edges with transparent film to prevent edge rolling. `,
            `Packed wound loosely with silver-impregnated ribbon gauze. Covered with silicone foam secondary dressing. `,
            `Applied barrier cream to periwound skin to prevent maceration. Dressed with a non-adherent contact layer and absorbent composite dressing. `
        ]);
        const tolerance = rng.pick([
            `Patient tolerated the procedure well with minimal reported discomfort. Instructed to keep dressing dry and intact. `,
            `Patient reported mild pain (3/10) during cleansing, relieved promptly after dressing application. Follow-up scheduled as planned. `,
            `Procedure completed without incident. Patient and family educated on signs of infection to monitor at home. `
        ]);

        history.push({
            date: dateStr,
            label: `${woundType} at ${woundLocation}`,
            summary: `${granulation}% granulation. ${i === 0 ? "Initial assessment." : "Progressive healing noted."}`,
            images: Array.from({
                length: rng.nextFloat() > 0.8 ? rng.nextInt(3, 5) : rng.nextInt(1, 3)
            }, (_, imgIdx) => ({
                id: `img-${patientId}-${i}-${imgIdx}`,
                src: `/${["wound-1.jpg", "wound-2.jpg", "wound-3.jpg"][imgIdx % 3]}`,
                tag: "Clinical View"
            })),
            details: {
                measurements: {
                    length: currentLength,
                    width: currentWidth,
                    depth: currentDepth,
                    area: currentArea,
                    tissues: [
                        { label: "Granulation", value: granulation, color: "red" },
                        { label: "Slough", value: slough, color: "yellow" }
                    ]
                },
                clinicalNotes: `Patient ${patientId} follow-up for ${woundType}. ${assessment}${cleaning}${dressing}${tolerance}`,
                doctor: rng.pick(doctors),
                time: `${rng.nextInt(8, 16)}:00`,
                camera: rng.pick(cameras),
                woundState: {
                    "Wound Bed": `${granulation}% granulation`,
                    "Exudate": rng.pick(["Serous", "Serosanguinous", "Purulent", "Sanguinous"]),
                    "Exudate Amount": rng.pick(["None", "Scant", "Moderate", "Heavy"]),
                    "Odor": rng.pick(["None", "Mild", "Strong", "Foul"]),
                    "Color": rng.pick(["Pink", "Red", "Yellow", "Black"]),
                    "Edges": rng.pick(["Attached", "Unattached", "Rolled", "Undermined"]),
                    "Periwound Skin": rng.pick(["Intact", "Erythematous", "Macerated", "Dry"]),
                    "Pain Level": `${rng.nextInt(0, 10)}/10`,
                    "Signs of Infection": rng.pick(["None", "Erythema", "Warmth", "Increased Pain"]),
                    "Tunneling": rng.pick(["None", "1cm at 12 o'clock", "2cm at 3 o'clock", "None"]),
                },
                diagnosis: {
                    "Diagnosis": woundType,
                    "Location": woundLocation,
                    "Classification": rng.pick(["Stage 2", "Stage 3", "Unstageable", "Superficial"]),
                    "Etiology": rng.pick(["Pressure", "Venous Insufficiency", "Arterial Insufficiency", "Surgical", "Trauma"]),
                    "Treatment Plan": rng.pick(["Moist wound healing", "Negative pressure therapy", "Debridement", "Compression"]),
                    "Frequency": rng.pick(["Daily", "Every 2 days", "Every 3 days", "Weekly"]),
                    "Debridement": rng.pick(["None", "Autolytic", "Enzymatic", "Sharp", "Mechanical"])
                },
                materials: {
                    "Primary Dressing": rng.pick(["Foam", "Alginate", "Hydrocolloid", "Silver", "Hydrogel"]),
                    "Secondary Dressing": rng.pick(["Fixation tape", "Film", "Gauze", "Composite"]),
                    "Compression": rng.pick(["None", "2-layer", "3-layer", "Tubular"]),
                    "Skin Protectant": rng.pick(["Barrier cream", "Film spray", "Zinc oxide", "None"]),
                    "Cleanser": rng.pick(["Saline", "PHMB", "Hypochlorous acid", "Tap water"])
                }
            }
        });
    }

    return history.reverse(); // Newest first
}

// --- Generated Patients ---
function generateMockPatients(count: number): Patient[] {
    const patients: Patient[] = [];
    for (let i = 1; i <= count; i++) {
        const id = `PAT-${1000 + i}`;
        const name = `${rng.pick(firstNames)} ${rng.pick(lastNames)}`;
        const age = rng.nextInt(65, 95);
        const gender = rng.pick(["Male", "Female"]);
        const status = rng.pick(["Improving", "Stable", "Worsening"]) as "Improving" | "Stable" | "Worsening";
        const woundsCount = rng.nextInt(1, 3);
        const healedCount = rng.nextInt(1, 2);

        const wounds = [];
        const pRng = new SeededRandom(parseInt(id.replace("PAT-", "")) || 12345);

        // Generate active wounds
        for (let w = 1; w <= woundsCount; w++) {
            const history = generateWoundHistory(id, w, pRng);
            const totalImages = history.reduce((acc, visit) => acc + visit.images.length, 0);
            const woundType = history[0]?.details?.diagnosis?.Diagnosis || "Wound";
            const woundLocation = history[0]?.details?.diagnosis?.Location || "Unknown Location";
            const oldestDate = history[history.length - 1]?.date || "2025-11-20";

            wounds.push({
                id: `W-00${w}`,
                label: woundType,
                type: woundLocation,
                status: pRng.pick(["Improving", "Stable", "Worsening"]),
                date: oldestDate,
                imageCount: totalImages,
                history: history
            });
        }

        // Generate healed wounds
        for (let w = 1; w <= healedCount; w++) {
            const wId = woundsCount + w;
            const history = generateWoundHistory(id, wId, pRng);
            const totalImages = history.reduce((acc, visit) => acc + visit.images.length, 0);
            const woundType = history[0]?.details?.diagnosis?.Diagnosis || "Wound";
            const woundLocation = history[0]?.details?.diagnosis?.Location || "Unknown Location";
            const oldestDate = history[history.length - 1]?.date || "2025-11-20";

            // Force healed state
            history[0].summary = "Wound is completely epithelized and closed.";
            history[0].details.measurements.length = "0.0";
            history[0].details.measurements.width = "0.0";
            history[0].details.measurements.depth = "0.0";
            history[0].details.measurements.area = "0.0";
            history[0].details.measurements.tissues = [
                { label: "Epithelial", value: 100, color: "pink" }
            ];
            history[0].details.clinicalNotes = `Patient ${id} follow-up for ${woundType}. Wound is completely healed and closed. No further dressings required. Discharged from active wound care.`;
            history[0].details.woundState["Wound Bed"] = "100% Epithelialized";
            history[0].details.woundState["Exudate"] = "None";
            history[0].details.woundState["Color"] = "Pink";

            wounds.push({
                id: `W-00${wId}`,
                label: woundType,
                type: woundLocation,
                status: "Healed",
                date: oldestDate,
                imageCount: totalImages,
                history: history
            });
        }

        patients.push({
            id,
            name,
            mrn: id,
            dob: `${2026 - age}-01-01`,
            age,
            gender,
            lastVisit: "2026-02-24",
            status,
            diagnoses: ["Chronic Wound Care"],
            woundCount: woundsCount,
            wounds
        });
    }
    return patients;
}

export const mockPatients = generateMockPatients(100);

// For detail view, we fetch the history on demand or pre-generate it
// In this mockup, we'll just return a history for the selected patient
export function getPatientHistory(patientId: string, woundId: string = "W-001"): Visit[] {
    const patient = mockPatients.find(p => p.id === patientId);
    if (!patient) return [];
    const wound = patient.wounds.find(w => w.id === woundId) || patient.wounds[0];
    return wound ? wound.history : [];
}

// Legacy exports for existing UI references
export const currentVisit: Visit = getPatientHistory(mockPatients[0].id)[0];
export const historyVisits: Visit[] = getPatientHistory(mockPatients[0].id).slice(1);
export const placeholderColors = [
    "from-primary/15 to-primary/5",
    "from-primary/10 to-accent/20",
    "from-muted to-secondary",
    "from-accent/30 to-muted",
    "from-primary/8 to-primary/18",
    "from-secondary to-accent/15",
];
