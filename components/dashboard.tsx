/** 
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts"
import Counter from "./counter"
import { useAuth } from "@/contexts/auth-context"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function Dashboard() {
    const { user } = useAuth()
    const [userData, setUserData] = useState<[]>([])
    const [counterHistory, setCounterHistory] = useState<{ value: number; timestamp: string }[]>([])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData") || "[]")
        setUserData(data)
        const history = JSON.parse(localStorage.getItem("counterHistory") || "[]")
        setCounterHistory(history)
        console.log(userData)
    }, [userData])

    const handleCounterChange = (value: number) => {
        const newHistory = [...counterHistory, { value, timestamp: new Date().toISOString() }]
        setCounterHistory(newHistory)
        localStorage.setItem("counterHistory", JSON.stringify(newHistory))
    }

    // Updated mock data for user statistics
    const userStats = {
        total: 5000,  // Increased total users
        today: 120,  // Mocked users for today
        thisWeek: 500,  // Mocked users for the past week
        thisMonth: 1500,  // Mocked users for the past month
    }

    // Updated mock pie data based on the new user stats
    const pieData = [
        { name: "Today", value: userStats.today },
        { name: "This Week", value: userStats.thisWeek - userStats.today },
        { name: "This Month", value: userStats.thisMonth - userStats.thisWeek },
        { name: "Older", value: userStats.total - userStats.thisMonth },
    ]

    return (
        <div className="space-y-6">
            {user && (
                <div className="bg-card rounded-lg shadow-sm p-6 border">
                    <h2 className="text-2xl font-semibold text-primary">Welcome back, {user.name}!</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Counter onCounterChange={handleCounterChange} />

                <Card>
                    <CardHeader>
                        <CardTitle>Counter History</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={counterHistory.slice(-20)}>
                                <XAxis dataKey="timestamp" tickFormatter={(value) => new Date(value).toLocaleTimeString()} />
                                <YAxis />
                                <Tooltip labelFormatter={(value) => new Date(value).toLocaleString()} />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>User Registration Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={[
                                    { period: "Today", users: userStats.today },
                                    { period: "This Week", users: userStats.thisWeek },
                                    { period: "This Month", users: userStats.thisMonth },
                                    { period: "Total", users: userStats.total },
                                ]}
                            >
                                <XAxis dataKey="period" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="users" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>User Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
*/
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts"
import Counter from "./counter"
import { useAuth } from "@/contexts/auth-context"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function Dashboard() {
    const { user } = useAuth()
    const [userData, setUserData] = useState<[]>([])
    const [counterHistory, setCounterHistory] = useState<{ value: number; timestamp: string }[]>([])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData") || "[]")
        setUserData(data)
        const history = JSON.parse(localStorage.getItem("counterHistory") || "[]")
        setCounterHistory(history)
    }, []) // Remove userData from the dependency array

    console.log(userData)

    const handleCounterChange = (value: number) => {
        const newHistory = [...counterHistory, { value, timestamp: new Date().toISOString() }]
        setCounterHistory(newHistory)
        localStorage.setItem("counterHistory", JSON.stringify(newHistory))
    }

    // Updated mock data for user statistics
    const userStats = {
        total: 5000,
        today: 120,
        thisWeek: 500,
        thisMonth: 1500,
    }

    // Updated mock pie data based on the new user stats
    const pieData = [
        { name: "Today", value: userStats.today },
        { name: "This Week", value: userStats.thisWeek - userStats.today },
        { name: "This Month", value: userStats.thisMonth - userStats.thisWeek },
        { name: "Older", value: userStats.total - userStats.thisMonth },
    ]

    return (
        <div className="space-y-6">
            {user && (
                <div className="bg-card rounded-lg shadow-sm p-6 border">
                    <h2 className="text-2xl font-semibold text-primary">Welcome back, {user.name}!</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Counter onCounterChange={handleCounterChange} />

                <Card>
                    <CardHeader>
                        <CardTitle>Counter History</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={counterHistory.slice(-20)}>
                                <XAxis dataKey="timestamp" tickFormatter={(value) => new Date(value).toLocaleTimeString()} />
                                <YAxis />
                                <Tooltip labelFormatter={(value) => new Date(value).toLocaleString()} />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>User Registration Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={[
                                    { period: "Today", users: userStats.today },
                                    { period: "This Week", users: userStats.thisWeek },
                                    { period: "This Month", users: userStats.thisMonth },
                                    { period: "Total", users: userStats.total },
                                ]}
                            >
                                <XAxis dataKey="period" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="users" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>User Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

