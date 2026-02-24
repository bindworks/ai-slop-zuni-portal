"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/patients")
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="animate-pulse flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary" />
        <div className="h-4 w-24 rounded bg-secondary" />
      </div>
    </div>
  )
}
