"use client"

import { createContext, useContext, useState, useEffect } from "react"

interface User {
    id: string
    name: string
    email: string
    image?: string
}

interface AuthContextType {
    user: User | null
    loading: boolean
    signIn: () => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    // Simulate auth loading
    useEffect(() => {
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

    const signIn = async () => {
        // Simulate Google Sign In
        const mockUser = {
            id: "1",
            name: "Test User",
            email: "test@example.com",
            image: "/placeholder.svg",
        }
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
    }

    const signOut = async () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    return <AuthContext.Provider value={{ user, loading, signIn, signOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

