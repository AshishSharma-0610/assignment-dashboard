"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NavigationGuard } from "./navigation-guard"
import { toast } from "sonner"

interface UserData {
    id: string
    name: string
    email: string
    phone: string
    address: string
    createdAt: string
}

export default function UserForm() {
    const [formData, setFormData] = useState<UserData>({
        id: uuidv4(),
        name: "",
        email: "",
        phone: "",
        address: "",
        createdAt: new Date().toISOString(),
    })
    const [isDirty, setIsDirty] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [pendingPath, setPendingPath] = useState<string | null>(null)
    const [errors, setErrors] = useState<Partial<UserData>>({})
    const router = useRouter()

    // Load saved data if exists
    useEffect(() => {
        const savedData = localStorage.getItem("currentUserForm")
        if (savedData) {
            setFormData(JSON.parse(savedData))
            setIsDirty(true)
        }
    }, [])

    const validateForm = () => {
        const newErrors: Partial<UserData> = {}
        const cleanedPhone = formData.phone.replace(/\D/g, "");

        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format"
        }

        if (!cleanedPhone.trim()) {
            newErrors.phone = "Phone is required";
        } else if (cleanedPhone.length !== 10) {
            newErrors.phone = "Invalid phone number";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Address is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        setIsDirty(true)
        localStorage.setItem(
            "currentUserForm",
            JSON.stringify({
                ...formData,
                [name]: value,
            }),
        )
    }

    const handleSubmit = () => {
        if (!validateForm()) {
            toast.error("Please fix the form errors")
            return
        }

        // Save to localStorage
        const existingData = JSON.parse(localStorage.getItem("userData") || "[]")
        const newData = [...existingData, formData]
        localStorage.setItem("userData", JSON.stringify(newData))

        // Clear form and draft
        setFormData({
            id: uuidv4(),
            name: "",
            email: "",
            phone: "",
            address: "",
            createdAt: new Date().toISOString(),
        })
        localStorage.removeItem("currentUserForm")
        setIsDirty(false)

        toast.success("User data saved successfully!")

        // If there's a pending navigation, execute it
        if (pendingPath) {
            router.push(pendingPath)
            setPendingPath(null)
        }
    }

    return (
        <>
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>User Information</span>
                        {isDirty && <span className="text-sm text-yellow-600 dark:text-yellow-400">Unsaved changes</span>}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                className={errors.phone ? "border-red-500" : ""}
                            />
                            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={errors.address ? "border-red-500" : ""}
                            />
                            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button
                                type="submit"
                                className="w-32"
                                onClick={handleSubmit} // Now calling handleSubmit without passing an event
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <NavigationGuard
                isDirty={isDirty}
                onConfirm={handleSubmit} // Passing handleSubmit directly
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                pendingPath={pendingPath}
                setPendingPath={setPendingPath}
            />
        </>
    )
}
