import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "Summer Collection 2025",
    description: "Discover our latest arrivals for the season",
    image: "/hero_placeholder.webp?height=600&width=1200",
    cta: "Shop Now",
    url: "/collections/summer",
  },
  {
    id: 2,
    title: "Limited Edition Merch",
    description: "Exclusive designs available for a limited time only",
    image: "/hero_placeholder.webp?height=600&width=1200",
    cta: "View Collection",
    url: "/collections/limited",
  },
  {
    id: 3,
    title: "Special Offers",
    description: "Up to 40% off on selected items",
    image: "/hero_placeholder.webp?height=600&width=1200",
    cta: "See Offers",
    url: "/offers",
  },
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative min-w-full">
            <div className="relative place-items-center grid w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
              <img
                src={slide.image || "/hero_placeholder.webp"}
                alt={slide.title}
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-white text-center">
                <h1 className="mb-2 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="mb-6 max-w-md text-sm sm:text-base md:text-lg">
                  {slide.description}
                </p>
                <Link to={slide.url}>
                  <Button size="lg" className="font-medium">
                    {slide.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="top-1/2 left-4 absolute bg-black/30 hover:bg-black/50 rounded-full text-white -translate-y-1/2"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="top-1/2 right-4 absolute bg-black/30 hover:bg-black/50 rounded-full text-white -translate-y-1/2"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      <div className="bottom-4 left-1/2 absolute flex gap-2 -translate-x-1/2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
