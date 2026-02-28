
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Page() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/patients", { replace: true })
  }, [navigate])

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="animate-pulse flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary" />
        <div className="h-4 w-24 rounded bg-secondary" />
      </div>
    </div>
  )
}
