import {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion, useInView} from 'motion/react';
import {ChevronDown, Eye, MapPin, Sparkles, X} from 'lucide-react';
import {weddingConfig, type WeddingEvent} from '../data/weddingData';

interface EventCardProps {
  event: WeddingEvent;
  index: number;
  isActive?: boolean;
  isUnfolded: boolean;
  onToggleFold: (id: string) => void;
  onSelectPhoto: (event: WeddingEvent) => void;
}

function EventCard({
  event,
  index,
  isActive,
  isUnfolded,
  onToggleFold,
  onSelectPhoto,
}: EventCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      initial={{opacity: 0, y: 24}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.2}}
      transition={{duration: 0.9, delay: index * 0.14, ease: [0.22, 1, 0.36, 1]}}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-[#150D11] text-center shadow-[0_18px_42px_rgba(0,0,0,0.65)] transition-all duration-500 ${
        isUnfolded
          ? 'border-[#D4A853]/55'
          : 'border-[#D4A853]/28 hover:border-[#D4A853]/45'
      } ${isActive === false ? 'scale-[0.94] opacity-70 md:scale-100 md:opacity-100' : 'scale-100 opacity-100'}`}
    >
      <button
        type="button"
        onClick={() => onSelectPhoto(event)}
        aria-label={`View ${event.name} photo`}
        className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden border-b border-[#D4A853]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECD08B]"
      >
        {imgError ? (
          <div
            className="flex h-full w-full items-center justify-center p-4"
            style={{background: event.headerGradient}}
          >
            <span className="font-display text-2xl italic text-[#ECD08B]">{event.name}</span>
          </div>
        ) : (
          <img
            src={event.image}
            alt={event.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#150D11]/80 via-transparent to-transparent"
        />
        <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-[#D4A853]/40 bg-[#0B0709]/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#ECD08B] backdrop-blur-sm">
          <Eye className="h-3 w-3" aria-hidden="true" />
          Photo
        </span>
      </button>

      <div className="velvet-card-surface flex flex-1 flex-col justify-between px-5 pb-5 pt-5">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#D4A853]">
            {event.when}
          </p>
          <h3 className="font-display mt-1.5 text-3xl font-medium text-[#F5ECE0]">
            {event.name}
          </h3>
        </div>

        {/* Crimson Ribbon & Gold Clasp */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => onToggleFold(event.id)}
            aria-expanded={isUnfolded}
            className={`relative flex min-h-[42px] w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border px-3.5 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECD08B] ${
              isUnfolded
                ? 'border-[#D4A853]/45 bg-[#221218] text-[#ECD08B]'
                : 'border-[#D4A853]/30 bg-gradient-to-r from-[#2A0B12] via-[#1C0D12] to-[#2A0B12] text-[#ECD08B] hover:border-[#D4A853]/60'
            }`}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-[#9E1B24]/55 via-[#D4A853]/60 to-[#9E1B24]/55"
            />
            <span className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-[#D4A853]/30 bg-[#120A0E]/95 px-3 py-1 shadow-sm">
              <Sparkles className="h-3 w-3 text-[#D4A853]" aria-hidden="true" />
              <span>{isUnfolded ? 'Fold Details' : 'Unfolding...'}</span>
              <motion.span
                animate={{rotate: isUnfolded ? 180 : 0}}
                transition={{duration: 0.4}}
                className="inline-flex"
              >
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              </motion.span>
            </span>
          </button>
        </div>

        {/* Slow-Motion Curtain-Opening Inner Details */}
        <AnimatePresence initial={false}>
          {isUnfolded && (
            <motion.div
              initial={{opacity: 0, height: 0}}
              animate={{opacity: 1, height: 'auto'}}
              exit={{opacity: 0, height: 0}}
              transition={{duration: 1.05, ease: [0.22, 1, 0.36, 1]}}
              className="overflow-hidden"
            >
              <div className="relative mt-4 overflow-hidden rounded-xl border border-[#D4A853]/28 bg-[#0D070A] p-4 text-center shadow-[inset_0_0_18px_rgba(158,27,36,0.2)]">
                <motion.div
                  aria-hidden="true"
                  className="mini-curtain-left pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 border-r border-[#D4A853]/35"
                  initial={{x: '0%'}}
                  animate={{x: '-102%'}}
                  exit={{x: '0%'}}
                  transition={{duration: 1.2, ease: [0.42, 0, 0.2, 1]}}
                />
                <motion.div
                  aria-hidden="true"
                  className="mini-curtain-right pointer-events-none absolute inset-y-0 right-0 z-10 w-1/2 border-l border-[#D4A853]/35"
                  initial={{x: '0%'}}
                  animate={{x: '102%'}}
                  exit={{x: '0%'}}
                  transition={{duration: 1.2, ease: [0.42, 0, 0.2, 1]}}
                />

                <p className="text-xs leading-relaxed text-[#C2B09E]">{event.highlightNote}</p>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-[#F5ECE0]">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#D4A853]" aria-hidden="true" />
                  <span>{event.place}</span>
                </div>

                <div className="mt-3 border-t border-[#D4A853]/20 pt-3">
                  <div className="flex items-center justify-center gap-2 text-xs text-[#C2B09E]">
                    <span
                      aria-hidden="true"
                      className="h-3 w-3 shrink-0 rounded-sm border border-[#F5ECE0]/40"
                      style={{backgroundColor: event.swatch}}
                    />
                    <span>
                      Attire · <span className="text-[#F5ECE0]">{event.dress}</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export function FestivitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, {once: true, amount: 0.2});
  const hasAutoUnfoldedRef = useRef(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<WeddingEvent | null>(null);
  const [modalImgError, setModalImgError] = useState(false);
  const [unfoldedIds, setUnfoldedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!isSectionInView || hasAutoUnfoldedRef.current) return;
    hasAutoUnfoldedRef.current = true;

    const timers = weddingConfig.events.map((ev, idx) =>
      window.setTimeout(() => {
        setUnfoldedIds((prev) => ({...prev, [ev.id]: true}));
      }, 280 + idx * 360)
    );

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [isSectionInView]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      let closestIdx = 0;
      let minDist = Infinity;
      Array.from(el.children).forEach((child, idx) => {
        const node = child as HTMLElement;
        const dist = Math.abs(node.offsetLeft + node.offsetWidth / 2 - center);
        if (dist < minDist) {
          minDist = dist;
          closestIdx = idx;
        }
      });
      setActiveIdx(closestIdx);
    };

    el.addEventListener('scroll', onScroll, {passive: true});
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!selectedEvent) return;
    setModalImgError(false);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedEvent(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedEvent]);

  const scrollToCard = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const target = el.children[idx] as HTMLElement | undefined;
    if (target) {
      el.scrollTo({
        left: target.offsetLeft - (el.clientWidth - target.offsetWidth) / 2,
        behavior: 'smooth',
      });
    }
  };

  const toggleFold = (id: string) => {
    setUnfoldedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="festivities"
      className="mx-auto max-w-6xl py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="px-4 text-center sm:px-0">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#D4A853]">
          Celebrations &amp; Gatherings
        </p>
        <h2 className="font-display mt-2 text-4xl font-medium tracking-wide text-[#F5ECE0] sm:text-5xl">
          Wedding Festivities
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-[#C2B09E]">
          Each ceremony card unfolds gracefully in slow motion to share its venue and attire.
        </p>
      </div>

      {/* Desktop Grid */}
      <div className="mt-10 hidden items-start gap-5 md:grid md:grid-cols-2 lg:grid-cols-4">
        {weddingConfig.events.map((event, idx) => (
          <EventCard
            key={event.id}
            event={event}
            index={idx}
            isUnfolded={!!unfoldedIds[event.id]}
            onToggleFold={toggleFold}
            onSelectPhoto={setSelectedEvent}
          />
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="mt-8 md:hidden">
        <div
          ref={carouselRef}
          className="no-scrollbar flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-[calc(50%-144px)] py-4"
        >
          {weddingConfig.events.map((event, idx) => (
            <div key={event.id} className="w-[288px] shrink-0 snap-center">
              <EventCard
                event={event}
                index={idx}
                isActive={idx === activeIdx}
                isUnfolded={!!unfoldedIds[event.id]}
                onToggleFold={toggleFold}
                onSelectPhoto={setSelectedEvent}
              />
            </div>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-center gap-2">
          {weddingConfig.events.map((event, idx) => (
            <button
              key={event.id}
              type="button"
              onClick={() => scrollToCard(idx)}
              aria-label={`View ${event.name}`}
              className="flex h-7 w-7 cursor-pointer items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECD08B]"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  idx === activeIdx ? 'w-5 bg-[#ECD08B]' : 'w-2 bg-[#D4A853]/35'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedEvent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedEvent.name} photo`}
          onClick={() => setSelectedEvent(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[#D4A853]/40 bg-[#150D11] shadow-[0_32px_80px_rgba(0,0,0,0.85)]"
          >
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              aria-label="Close photo preview"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#D4A853]/50 bg-[#0B0709]/85 text-[#F5ECE0] transition-colors hover:bg-[#9E1B24] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECD08B]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-[4/3] w-full bg-[#0B0709]">
              {modalImgError ? (
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{background: selectedEvent.headerGradient}}
                >
                  <span className="font-display text-3xl italic text-[#ECD08B]">
                    {selectedEvent.name}
                  </span>
                </div>
              ) : (
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.name}
                  referrerPolicy="no-referrer"
                  onError={() => setModalImgError(true)}
                  className="h-full w-full object-cover"
                />
              )}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#150D11] via-transparent to-transparent"
              />
            </div>

            <div className="px-6 pb-6 pt-3 text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#D4A853]">
                {selectedEvent.when}
              </p>
              <h3 className="font-display mt-1 text-3xl font-medium text-[#F5ECE0]">
                {selectedEvent.name}
              </h3>
              <p className="mt-1.5 text-sm text-[#C2B09E]">{selectedEvent.place}</p>
              <div className="mt-4 flex items-center justify-center gap-2 border-t border-[#D4A853]/18 pt-3 text-xs text-[#C2B09E]">
                <span
                  aria-hidden="true"
                  className="h-3 w-3 rounded-sm border border-[#F5ECE0]/40"
                  style={{backgroundColor: selectedEvent.swatch}}
                />
                <span>
                  Attire · <span className="text-[#F5ECE0]">{selectedEvent.dress}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
