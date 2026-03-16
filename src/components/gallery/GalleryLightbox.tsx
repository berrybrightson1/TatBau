"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";

export type GalleryImage = { src: string; caption: string };

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

export function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const current = index !== null ? images[index] : null;

  const goPrev = useCallback(() => {
    if (index === null) return;
    setIndex((i) => (i == null || i <= 0 ? images.length - 1 : i - 1));
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [index, images.length]);

  const goNext = useCallback(() => {
    if (index === null) return;
    setIndex((i) => (i == null || i >= images.length - 1 ? 0 : i + 1));
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [index, images.length]);

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP));
  }, []);

  const close = useCallback(() => {
    setIndex(null);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close, goPrev, goNext]);

  useEffect(() => {
    if (index !== null) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [index]);

  const lightboxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (index === null || !lightboxRef.current) return;
    const el = lightboxRef.current;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) setZoom((z) => Math.min(MAX_ZOOM, z + 0.15));
      else setZoom((z) => Math.max(MIN_ZOOM, z - 0.15));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [index]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {images.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setIndex(i);
              setZoom(1);
              setPosition({ x: 0, y: 0 });
            }}
            className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-surface border border-white/5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Image
              src={item.src}
              alt={item.caption}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.caption}
            </span>
          </button>
        ))}
      </div>

      {current && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-3 sm:p-4 z-10 min-h-[56px]">
            <button
              type="button"
              onClick={close}
              className="p-3 sm:p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors touch-manipulation"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); zoomOut(); }}
                className="p-3 sm:p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50 touch-manipulation"
                aria-label="Zoom out"
                disabled={zoom <= MIN_ZOOM}
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-white text-sm min-w-[2.5rem] sm:min-w-[3rem] text-center tabular-nums">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); zoomIn(); }}
                className="p-3 sm:p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50 touch-manipulation"
                aria-label="Zoom in"
                disabled={zoom >= MAX_ZOOM}
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={lightboxRef}
            className="flex-1 flex items-center justify-center overflow-hidden p-3 sm:p-4 pt-14 sm:pt-16 min-h-0"
          >
            <div
              className="relative w-full h-full max-w-6xl max-h-[75vh] sm:max-h-[85vh] flex items-center justify-center"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transition: "transform 0.2s ease-out",
              }}
            >
              <Image
                src={current.src}
                alt={current.caption}
                fill
                className="object-contain select-none"
                sizes="100vw"
                onClick={(e) => e.stopPropagation()}
                draggable={false}
                priority
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-3 sm:p-4 z-10 min-h-[56px] gap-2">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors touch-manipulation flex-shrink-0"
              aria-label="Previous"
            >
              <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" />
            </button>
            <p className="text-white/90 text-xs sm:text-base max-w-[50%] sm:max-w-[60%] truncate text-center px-1">
              {current.caption}
            </p>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors touch-manipulation flex-shrink-0"
              aria-label="Next"
            >
              <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" />
            </button>
          </div>

          <p className="text-white/50 text-[10px] sm:text-xs text-center py-2 px-2">
            {index! + 1} / {images.length}
            <span className="hidden sm:inline"> · Esc to close · ← → to navigate</span>
          </p>
        </div>
      )}
    </>
  );
}
