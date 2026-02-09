'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface CarouselProps {
  children: React.ReactNode[];
  slidesPerView?: {
    base: number;
    md?: number;
    lg?: number;
  };
  gap?: number;
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
}

function getPerView(slidesPerView: CarouselProps['slidesPerView']) {
  if (typeof window === 'undefined') return slidesPerView?.base ?? 1;
  const w = window.innerWidth;
  if (w >= 1024 && slidesPerView?.lg) return slidesPerView.lg;
  if (w >= 768 && slidesPerView?.md) return slidesPerView.md;
  return slidesPerView?.base ?? 1;
}

export default function Carousel({
  children,
  slidesPerView = { base: 1, md: 2, lg: 3 },
  gap = 32,
  loop = true,
  autoplay: autoplayEnabled = false,
  autoplayDelay = 5000,
  showArrows = true,
  showDots = true,
  className = '',
}: CarouselProps) {
  const [perView, setPerView] = useState(slidesPerView.base);

  const plugins = autoplayEnabled
    ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: true })]
    : [];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop, align: 'start', slidesToScroll: 1 },
    plugins,
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', () => {
      onSelect();
      setScrollSnaps(emblaApi.scrollSnapList());
    });
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Handle responsive perView changes
  useEffect(() => {
    const update = () => {
      const newPerView = getPerView(slidesPerView);
      setPerView(newPerView);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [slidesPerView]);

  // Reinit embla when perView changes
  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi, perView]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const slideStyle = {
    flex: `0 0 calc(${100 / perView}% - ${(gap * (perView - 1)) / perView}px)`,
    marginRight: `${gap}px`,
  };

  const needsNav = children.length > perView;

  return (
    <div className={`relative ${className}`}>
      {/* Viewport */}
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {children.map((child, index) => (
            <div
              key={index}
              className="embla__slide"
              style={slideStyle}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {showArrows && needsNav && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!loop && !canScrollPrev}
            className="absolute top-1/2 -left-5 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/20 hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed hidden md:flex"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-light text-sm" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!loop && !canScrollNext}
            className="absolute top-1/2 -right-5 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/20 hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed hidden md:flex"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-light text-sm" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && needsNav && scrollSnaps.length > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === selectedIndex
                  ? 'bg-primary w-8'
                  : 'bg-white/20 w-2.5 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
