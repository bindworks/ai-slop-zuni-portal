import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { GlobalLayout } from './layouts/GlobalLayout'
import PatientLayout from './pages/patients/[patientId]/layout'
import PatientOverview from './pages/patients/[patientId]/page'
import DocumentsLayout from './pages/patients/[patientId]/documents/layout'
import PatientDocuments from './pages/patients/[patientId]/documents/page'
import PatientDocumentDetail from './pages/patients/[patientId]/documents/[docid]/page'
import TimelineLayout from './pages/patients/[patientId]/timeline/layout'
import PatientTimeline from './pages/patients/[patientId]/timeline/page'
import TimelineEventPage from './pages/patients/[patientId]/timeline/[eventId]/page'
import WoundLayout from './pages/patients/[patientId]/wounds/[woundid]/layout'
import WoundPage from './pages/patients/[patientId]/wounds/[woundid]/page'
import WoundImageDetailPage from './pages/patients/[patientId]/wounds/[woundid]/images/[imageid]/page'
import PatientPhotos from './pages/patients/[patientId]/photos/page'
import PhotoDetailPage from './pages/patients/[patientId]/photos/[imageid]/page'
import PatientsPage from './pages/patients/page'
import SecurityLayout from './pages/security/layout'
import SecurityOverview from './pages/security/page'
import DevicesPage from './pages/security/devices/page'
import SessionsPage from './pages/security/sessions/page'
import RootPage from './pages/dashboard'

export default function App() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route element={<GlobalLayout />}>
                    <Route path="/" element={<RootPage />} />
                    <Route path="/patients" element={<PatientsPage />} />

                    <Route path="/patients/:patientId" element={<PatientLayout />}>
                        <Route index element={<PatientOverview />} />
                        <Route path="documents" element={<DocumentsLayout />}>
                            <Route index element={<PatientDocuments />} />
                            <Route path=":docid" element={<PatientDocumentDetail />} />
                        </Route>
                        <Route path="timeline" element={<TimelineLayout />}>
                            <Route index element={<PatientTimeline />} />
                            <Route path=":eventId" element={<TimelineEventPage />} />
                        </Route>
                        <Route path="wounds/:woundid" element={<WoundLayout />}>
                            <Route index element={<WoundPage />} />
                            <Route path="images/:imageid" element={<WoundImageDetailPage />} />
                        </Route>
                        <Route path="photos">
                            <Route index element={<PatientPhotos />} />
                            <Route path=":imageid" element={<PhotoDetailPage />} />
                        </Route>
                    </Route>

                    <Route path="/security" element={<SecurityLayout />}>
                        <Route index element={<SecurityOverview />} />
                        <Route path="devices" element={<DevicesPage />} />
                        <Route path="sessions" element={<SessionsPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
