/** 
"use client"

import { useState, type ReactNode } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Settings, LayoutDashboard, UserPlus, FileEdit, Moon, Sun, Menu } from "lucide-react"
import { useTheme } from "next-themes"

export default function DashboardLayout({
    children,
}: {
    children: ReactNode
}) {
    const { user, signOut } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)  // State to handle menu toggle

    const handleSignOut = async () => {
        await signOut()
        router.push("/")
    }

    const navItems = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            label: "User Form",
            path: "/dashboard/form",
            icon: UserPlus,
        },
        {
            label: "Editor",
            path: "/dashboard/editor",
            icon: FileEdit,
        },
    ]

    return (
        <div className="min-h-screen bg-background">
            <nav className="border-b bg-card">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                       
                        <div className="flex items-center space-x-8">
                            <div className="flex-shrink-0 flex items-center">
                                <span className="text-xl font-bold text-primary">Dashboard</span>
                            </div>

                            <div className="hidden md:flex items-center space-x-4">
                                {navItems.map((item) => (
                                    <Button
                                        key={item.path}
                                        variant={pathname === item.path ? "default" : "ghost"}
                                        className="flex items-center space-x-2"
                                        onClick={() => router.push(item.path)}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>

                  
                        <div className="md:hidden">
                            <Button
                                variant="ghost"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}  // Toggle menu visibility
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                        </div>

              
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </Button>

                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                            <User className="h-5 w-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel>
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleSignOut}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Sign out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Button onClick={() => router.push("/")} variant="ghost">
                                    Sign In
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

               
                {isMenuOpen && (
                    <div className="md:hidden flex flex-col items-center space-y-2 bg-card py-4">
                        {navItems.map((item) => (
                            <Button
                                key={item.path}
                                variant={pathname === item.path ? "default" : "ghost"}
                                className="flex items-center space-x-2"
                                onClick={() => {
                                    router.push(item.path)
                                    setIsMenuOpen(false)  // Close menu after navigation
                                }}
                            >
                                <item.icon className="h-4 w-4" />
                                <span>{item.label}</span>
                            </Button>
                        ))}
                    </div>
                )}
            </nav>

            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{children}</main>
        </div>
    )
}
*/
"use client" // Ensure this is a client-side component

import { useState, useEffect, type ReactNode } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Settings, LayoutDashboard, UserPlus, FileEdit, Moon, Sun, Menu } from "lucide-react"
import { useTheme } from "next-themes"

export default function DashboardLayout({
    children,
}: {
    children: ReactNode
}) {
    const { user, signOut } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)  // State to handle menu toggle

    // We need to ensure the theme is set correctly after the client has mounted
    const [mounted, setMounted] = useState(false)

    // This effect will run only on the client after the first render
    useEffect(() => {
        setMounted(true)
    }, [])

    const handleSignOut = async () => {
        await signOut()
        router.push("/")
    }

    const navItems = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            label: "User Form",
            path: "/dashboard/form",
            icon: UserPlus,
        },
        {
            label: "Editor",
            path: "/dashboard/editor",
            icon: FileEdit,
        },
    ]

    return (
        <div className="min-h-screen bg-background">
            <nav className="border-b bg-card">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <div className="flex items-center space-x-8">
                            <div className="flex-shrink-0 flex items-center">
                                <span className="text-xl font-bold text-primary">Dashboard</span>
                            </div>

                            {/* Nav links (hidden on mobile) */}
                            <div className="hidden md:flex items-center space-x-4">
                                {navItems.map((item) => (
                                    <Button
                                        key={item.path}
                                        variant={pathname === item.path ? "default" : "ghost"}
                                        className="flex items-center space-x-2"
                                        onClick={() => router.push(item.path)}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Hamburger icon for mobile */}
                        <div className="md:hidden">
                            <Button
                                variant="ghost"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}  // Toggle menu visibility
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                        </div>

                        {/* Theme switch and user profile */}
                        <div className="flex items-center space-x-4">
                            {/* Only show theme toggle after the component has mounted */}
                            {mounted && (
                                <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </Button>
                            )}

                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                            <User className="h-5 w-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel>
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleSignOut}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Sign out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Button onClick={() => router.push("/")} variant="ghost">
                                    Sign In
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu (visible when isMenuOpen is true) */}
                {isMenuOpen && (
                    <div className="md:hidden flex flex-col items-center space-y-2 bg-card py-4">
                        {navItems.map((item) => (
                            <Button
                                key={item.path}
                                variant={pathname === item.path ? "default" : "ghost"}
                                className="flex items-center space-x-2"
                                onClick={() => {
                                    router.push(item.path)
                                    setIsMenuOpen(false)  // Close menu after navigation
                                }}
                            >
                                <item.icon className="h-4 w-4" />
                                <span>{item.label}</span>
                            </Button>
                        ))}
                    </div>
                )}
            </nav>

            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{children}</main>
        </div>
    )
}
