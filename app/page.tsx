"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { FaGoogle } from "react-icons/fa"  // Import the Google icon from react-icons

export default function LandingPage() {
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSignIn = async () => {
    await signIn()
    router.push("/dashboard")
  }

  const handleGuestAccess = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      <div className="max-w-md w-full mx-4">
        <div className="bg-card rounded-lg shadow-xl p-8 space-y-6 border">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-primary">Dashboard App</h1>
            <p className="text-muted-foreground">
              A feature-rich dashboard with counter animations, user management, and data visualization
            </p>
          </div>

          <div className="space-y-4">
            <Button onClick={handleSignIn} className="w-full flex items-center justify-center gap-2" size="lg">
              <FaGoogle className="w-5 h-5" />  {/* Use the Google icon here */}
              Sign in with Google
            </Button>
            <Button onClick={handleGuestAccess} variant="outline" className="w-full" size="lg">
              Explore as Guest
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Features include:</p>
            <ul className="mt-2 space-y-1">
              <li>✨ Interactive Counter with Animations</li>
              <li>📊 Real-time Data Visualization</li>
              <li>📝 Rich Text Editor</li>
              <li>🌙 Dark Mode Support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
