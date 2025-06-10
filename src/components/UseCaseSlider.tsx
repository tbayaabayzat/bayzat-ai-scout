
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const useCases = [
  {
    id: 1,
    title: "Sales Intelligence",
    description: "Get insights into your prospects before the call",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Lead Qualification",
    description: "Automatically score and prioritize your leads",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Pipeline Management",
    description: "Track deals and forecast revenue with AI assistance",
    image: "/placeholder.svg"
  }
]

export function UseCaseSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % useCases.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % useCases.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + useCases.length) % useCases.length)
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center p-12">
      <div className="max-w-lg w-full">
        {/* Slide Content */}
        <div className="text-center space-y-8 animate-fade-in">
          <div className="aspect-[4/3] bg-background rounded-2xl shadow-lg border border-border/20 flex items-center justify-center">
            <img 
              src={useCases[currentSlide].image}
              alt={useCases[currentSlide].title}
              className="w-32 h-32 object-contain opacity-40"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-medium text-foreground">
              {useCases[currentSlide].title}
            </h3>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              {useCases[currentSlide].description}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="h-10 w-10 rounded-full hover:bg-muted/50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Dots */}
          <div className="flex space-x-2">
            {useCases.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? "bg-bayzat-purple" 
                    : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="h-10 w-10 rounded-full hover:bg-muted/50"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
