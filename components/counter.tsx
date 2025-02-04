"use client"
import { useState, useEffect } from "react"
import { useSpring, animated } from "@react-spring/web"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Minus, RotateCcw, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface CounterProps {
    onCounterChange?: (value: number) => void
}

const AnimatedDiv = animated("div")

export default function Counter({ onCounterChange }: CounterProps) {
    const [count, setCount] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const backgroundProps = useSpring({
        backgroundColor: `hsl(${Math.min(count * 10, 360)}, 70%, 90%)`,
        config: {
            tension: 280,
            friction: 60,
        },
    })

    const numberProps = useSpring({
        number: count,
        from: { number: 0 },
        config: { mass: 1, tension: 280, friction: 60 },
    })

    const pulseAnimation = useSpring({
        transform: isAnimating ? "scale(1.2)" : "scale(1)",
        config: { tension: 300, friction: 10 },
    })

    useEffect(() => {
        const savedCount = localStorage.getItem("count")
        if (savedCount) {
            setCount(Number.parseInt(savedCount, 10))
        }
    }, [])

    const updateCount = (newCount: number) => {
        setCount(newCount)
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 200)
        localStorage.setItem("count", newCount.toString())
        onCounterChange?.(newCount)
    }

    const increment = () => updateCount(count + 1)
    const decrement = () => updateCount(count - 1)
    const reset = () => updateCount(0)
    const powerUp = () => updateCount(count * 2)

    return (
        <AnimatedDiv style={backgroundProps} className="w-full min-h-[300px] rounded-lg p-6">
            <Card className="w-full max-w-md mx-auto bg-background/80 backdrop-blur shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Interactive Counter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <AnimatedDiv style={pulseAnimation} className="text-7xl font-bold text-center text-primary transition-colors">
                        {numberProps.number.to((n) => Math.floor(n))}
                    </AnimatedDiv>
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            onClick={increment}
                            className="h-16 text-lg font-semibold transition-all hover:scale-105"
                            variant="default"
                        >
                            <Plus className="mr-2 h-5 w-5" />
                            Increment
                        </Button>
                        <Button
                            onClick={decrement}
                            className="h-16 text-lg font-semibold transition-all hover:scale-105"
                            variant="default"
                        >
                            <Minus className="mr-2 h-5 w-5" />
                            Decrement
                        </Button>
                        <Button
                            onClick={reset}
                            className="h-16 text-lg font-semibold transition-all hover:scale-105"
                            variant="outline"
                        >
                            <RotateCcw className="mr-2 h-5 w-5" />
                            Reset
                        </Button>
                        <Button
                            onClick={powerUp}
                            className={cn(
                                "h-16 text-lg font-semibold transition-all hover:scale-105",
                                "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
                            )}
                        >
                            <Zap className="mr-2 h-5 w-5" />
                            Power Up
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm text-muted-foreground">
                        Try using keyboard shortcuts: ↑ to increment, ↓ to decrement, R to reset, P to power up
                    </div>
                </CardContent>
            </Card>
        </AnimatedDiv>
    )
}

