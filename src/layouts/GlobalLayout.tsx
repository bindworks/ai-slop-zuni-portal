import { Outlet } from 'react-router-dom'
import { ReactNode } from 'react'

export function GlobalLayout() {
    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <Outlet />
        </div>
    )
}
