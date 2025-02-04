"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface NavigationGuardProps {
    isDirty: boolean
    onConfirm: () => void
    showDialog: boolean
    setShowDialog: (show: boolean) => void
    pendingPath: string | null
    setPendingPath: (path: string | null) => void
}

export function NavigationGuard({
    isDirty,
    onConfirm,
    showDialog,
    setShowDialog,
    pendingPath,
    setPendingPath,
}: NavigationGuardProps) {
    const router = useRouter()
    const pathname = usePathname()
    console.log(pathname)

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault()
                e.returnValue = ""
            }
        }

        window.addEventListener("beforeunload", handleBeforeUnload)
        return () => window.removeEventListener("beforeunload", handleBeforeUnload)
    }, [isDirty])



    return (
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
                    <AlertDialogDescription>
                        You have unsaved changes. Would you like to save them before leaving?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setPendingPath(null)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            onConfirm()
                            if (pendingPath) {
                                router.push(pendingPath)
                            }
                            setPendingPath(null)
                        }}
                    >
                        Save & Continue
                    </AlertDialogAction>
                    <AlertDialogAction
                        className="destructive-action" // Apply the 'destructive' style via className
                        onClick={() => {
                            if (pendingPath) {
                                router.push(pendingPath)
                            }
                            setPendingPath(null)
                        }}
                    >
                        Discard & Continue
                    </AlertDialogAction>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export const useNavigationGuard = () => {
    // The function `handleNavigation` can be implemented here if it's required in the component using the guard.
}

