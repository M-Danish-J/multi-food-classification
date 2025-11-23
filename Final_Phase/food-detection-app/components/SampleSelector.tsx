"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface SampleSelectorProps {
  onSampleSelected: (imageUrl: string) => void;
  disabled?: boolean;
}

const SAMPLE_IMAGES = [
  { id: 1, url: "/samples/sample-1.jpg", name: "Mixed Plate" },
  { id: 2, url: "/samples/sample-2.jpg", name: "Rice & Curry" },
  { id: 3, url: "/samples/sample-3.jpg", name: "Traditional Meal" },
  { id: 4, url: "/samples/sample-4.jpg", name: "Complete Thali" },
  { id: 5, url: "/samples/sample-5.jpg", name: "Daal & Rice" },
  { id: 6, url: "/samples/sample-6.jpg", name: "Mixed Dishes" },
  { id: 7, url: "/samples/sample-7.jpg", name: "Full Spread" },
  { id: 8, url: "/samples/sample-8.jpg", name: "Curry Platter" },
  { id: 9, url: "/samples/sample-9.jpg", name: "Food Combo" },
  { id: 10, url: "/samples/sample-10.jpg", name: "Meal Set" },
  { id: 11, url: "/samples/sample-11.jpg", name: "Dinner Plate" },
];

export function SampleSelector({
  onSampleSelected,
  disabled,
}: SampleSelectorProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 640px)": { slidesToScroll: 2 },
        "(min-width: 1024px)": { slidesToScroll: 3 },
      },
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleSelect = (sample: (typeof SAMPLE_IMAGES)[0]) => {
    setSelectedId(sample.id);
    onSampleSelected(sample.url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          <h3 className="font-semibold text-sm md:text-base">
            Try sample images:
          </h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            disabled={disabled}
            className="h-7 w-7 md:h-8 md:w-8 rounded-full"
          >
            <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            disabled={disabled}
            className="h-7 w-7 md:h-8 md:w-8 rounded-full"
          >
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex gap-2 md:gap-3">
          {SAMPLE_IMAGES.map((sample) => (
            <div
              key={sample.id}
              className="flex-[0_0_45%] min-w-0 sm:flex-[0_0_30%] md:flex-[0_0_23%] lg:flex-[0_0_18%]"
            >
              <Card
                className={`cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  selectedId === sample.id
                    ? "ring-2 ring-primary ring-offset-2 shadow-lg scale-105"
                    : "hover:ring-1 hover:ring-primary/50"
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => !disabled && handleSelect(sample)}
              >
                <div className="relative aspect-square">
                  <Image
                    src={sample.url}
                    alt={sample.name}
                    fill
                    className="object-cover transition-transform duration-300"
                    sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 23vw, 18vw"
                  />
                  {selectedId === sample.id && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="bg-primary text-primary-foreground rounded-full p-2 md:p-2.5 shadow-lg">
                        <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-1.5 md:p-2 text-center bg-gradient-to-t from-background/95 to-background/80 backdrop-blur-sm">
                  <p className="text-[10px] md:text-xs font-medium truncate">
                    {sample.name}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
