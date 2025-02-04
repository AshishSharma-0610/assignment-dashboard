"use client" // Ensure this is a client-side component

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight } from "lucide-react"

// Define the user interface to avoid implicit 'any'
interface User {
    name: string
    email: string
    phone: string
    address: string
}

export default function RichTextEditor() {
    const [content, setContent] = useState("")
    const [userData, setUserData] = useState<User[]>([]) // Use the User interface
    const editorRef = useRef<HTMLDivElement>(null)

    console.log(userData)

    // UseEffect runs only once when the component is mounted
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData") || "[]")
        setUserData(data) // Set userData once on mount

        // Initialize content with user data
        const initialContent = data
            .map(
                (user: User) => `
                    <div class="user-data-entry">
                        <h3 class="text-lg font-bold">${user.name}</h3>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>Phone:</strong> ${user.phone}</p>
                        <p><strong>Address:</strong> ${user.address}</p>
                    </div>
                `
            )
            .join('<hr class="my-4"/>')
        setContent(initialContent)
    }, []) // Empty dependency array ensures this effect runs only once when the component is mounted

    const formatText = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value)
        if (editorRef.current) {
            const newContent = editorRef.current.innerHTML
            setContent(newContent)
            localStorage.setItem("editorContent", newContent)
        }
        editorRef.current?.focus()
    }

    const toolbarButtons = [
        { icon: Bold, command: "bold", tooltip: "Bold" },
        { icon: Italic, command: "italic", tooltip: "Italic" },
        { icon: Underline, command: "underline", tooltip: "Underline" },
        { icon: List, command: "insertUnorderedList", tooltip: "Bullet List" },
        { icon: AlignLeft, command: "justifyLeft", tooltip: "Align Left" },
        { icon: AlignCenter, command: "justifyCenter", tooltip: "Align Center" },
        { icon: AlignRight, command: "justifyRight", tooltip: "Align Right" },
    ]

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Rich Text Editor</CardTitle>
                <div className="flex flex-wrap gap-2 p-2 bg-muted rounded-md">
                    {toolbarButtons.map((button) => (
                        <Button
                            key={button.command}
                            variant="ghost"
                            size="icon"
                            onClick={() => formatText(button.command)}
                            title={button.tooltip}
                            className="h-8 w-8"
                        >
                            <button.icon className="h-4 w-4" />
                        </Button>
                    ))}
                </div>
            </CardHeader>
            <CardContent>
                <div
                    ref={editorRef}
                    contentEditable
                    className="min-h-[400px] p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring prose prose-sm max-w-none"
                    onInput={(e) => {
                        const newContent = e.currentTarget.innerHTML
                        setContent(newContent)
                        localStorage.setItem("editorContent", newContent)
                    }}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </CardContent>
        </Card>
    )
}
