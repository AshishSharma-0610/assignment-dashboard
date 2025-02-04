"use client"

import { useEffect } from "react"

interface ShortcutHandler {
    key: string
    callback: () => void
    ctrlKey?: boolean
    altKey?: boolean
    shiftKey?: boolean
}

export function useKeyboardShortcuts(shortcuts: ShortcutHandler[]) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            shortcuts.forEach(({ key, callback, ctrlKey, altKey, shiftKey }) => {
                if (
                    event.key.toLowerCase() === key.toLowerCase() &&
                    (!ctrlKey || event.ctrlKey) &&
                    (!altKey || event.altKey) &&
                    (!shiftKey || event.shiftKey)
                ) {
                    event.preventDefault()
                    callback()
                }
            })
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [shortcuts])
}

