"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MediaSlide } from "@/content/types";
import PcbPanel from "./PcbPanel";
import CodeTerminal from "./CodeTerminal";

export default function MediaCarousel({ slides }: { slides: MediaSlide[] }) {
  const [index, setIndex] = useState(0);

  if (slides.length === 0) return null;
  const slide = slides[index];
  const go = (delta: number) =>
    setIndex((current) => (current + delta + slides.length) % slides.length);

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-ink">
        {slide.kind === "image" && slide.src && (
          <Image
            src={slide.src}
            alt={slide.alt ?? ""}
            fill
            sizes="(max-width: 768px) 92vw, 640px"
            className="object-cover"
          />
        )}
        {slide.kind === "pcb" && <PcbPanel />}
        {slide.kind === "code" && <CodeTerminal />}
        {slide.kind === "placeholder" && (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
            <p className="max-w-sm text-sm leading-relaxed text-muted">{slide.note}</p>
          </div>
        )}

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-line bg-ink/70 p-2 text-paper backdrop-blur transition-colors hover:border-flame/60 hover:text-flame"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-line bg-ink/70 p-2 text-paper backdrop-blur transition-colors hover:border-flame/60 hover:text-flame"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-4 bg-flame" : "w-1.5 bg-line"
                  }`}
                />
              ))}
            </div>
            <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2 py-0.5 text-[10px] text-muted backdrop-blur">
              {index + 1} / {slides.length}
            </span>
          </>
        )}
      </div>
      {(slide.caption ?? slide.note) && (
        <p className="mt-2 text-center text-xs text-muted">{slide.caption ?? slide.note}</p>
      )}
    </div>
  );
}
