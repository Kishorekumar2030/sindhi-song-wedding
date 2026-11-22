import {useEffect, useRef, useState} from 'react';
import {motion, useInView} from 'motion/react';
import {CalendarPlus, Download} from 'lucide-react';
import {
  downloadIcsFile,
  getGoogleCalendarUrl,
  weddingConfig,
} from '../data/weddingData';

function getCountdown() {
  const target = new Date(weddingConfig.dateISO).getTime();
  const diff = Math.max(0, Math.floor((target - Date.now()) / 1000));
  return {
    days: Math.floor(diff / 86400),
    hours: Math.floor((diff % 86400) / 3600),
    minutes: Math.floor((diff % 3600) / 60),
    seconds: diff % 60,
  };
}

const DEFAULT_SCROLL_HEIGHT = 460;

export function SaveTheDateScroll() {
  const [scrollHeight, setScrollHeight] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [countdown, setCountdown] = useState(getCountdown);

  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, {once: true, amount: 0.3});
  const hasAutoOpenedRef = useRef(false);

  const rodRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);
  const movedRef = useRef(false);

  const getMaxHeight = () => (contentRef.current?.scrollHeight || DEFAULT_SCROLL_HEIGHT) + 12;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isSectionInView || hasAutoOpenedRef.current) return;
    hasAutoOpenedRef.current = true;
    const timer = window.setTimeout(() => {
      setIsExpanded(true);
      setScrollHeight(getMaxHeight());
    }, 320);
    return () => window.clearTimeout(timer);
  }, [isSectionInView]);

  useEffect(() => {
    if (!isExpanded) return;
    const onResize = () => setScrollHeight(getMaxHeight());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isExpanded]);

  const toggleExpand = (next: boolean) => {
    setIsExpanded(next);
    setScrollHeight(next ? getMaxHeight() : 0);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    movedRef.current = false;
    startYRef.current = e.clientY;
    startHeightRef.current = scrollHeight;
    rodRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const delta = e.clientY - startYRef.current;
    if (Math.abs(delta) > 4) movedRef.current = true;
    const maxH = getMaxHeight();
    setScrollHeight(Math.max(0, Math.min(maxH, startHeightRef.current + delta)));
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (movedRef.current) {
      toggleExpand(scrollHeight > getMaxHeight() * 0.35);
    } else {
      toggleExpand(!isExpanded);
    }
  };

  const pad = (val: number) => String(val).padStart(2, '0');

  return (
    <section
      ref={sectionRef}
      id="save-the-date"
      className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8"
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#D4A853]">
        Auspicious Moment
      </p>
      <h2 className="font-display mt-2 text-4xl font-medium tracking-wide text-[#F5ECE0] sm:text-5xl">
        Save the Date
      </h2>

      <div className="relative mx-auto mt-8 max-w-md select-none">
        {/* Scroll Rod + Crimson & Gold Tassel */}
        <div
          ref={rodRef}
          role="button"
          tabIndex={0}
          aria-expanded={isExpanded}
          aria-controls="save-the-date-scroll"
          aria-label={
            isExpanded
              ? 'Pull up to close Save the Date scroll'
              : 'Pull the tassel down to reveal Save the Date'
          }
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleExpand(!isExpanded);
            }
          }}
          className={`relative z-20 mx-auto flex h-4 w-full items-center justify-between rounded-full border border-[#ECD08B]/65 px-0 shadow-[0_6px_18px_rgba(0,0,0,0.75)] touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECD08B] ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            background: 'linear-gradient(180deg, #F3D999 0%, #C6933E 55%, #7D581D 100%)',
          }}
        >
          <span className="-ml-2 h-6 w-3 rounded-full border border-[#ECD08B]/70 bg-gradient-to-b from-[#ECD08B] to-[#8C611F] shadow-md" />
          <span className="-mr-2 h-6 w-3 rounded-full border border-[#ECD08B]/70 bg-gradient-to-b from-[#ECD08B] to-[#8C611F] shadow-md" />

          <span
            aria-hidden="true"
            className={`tassel-sway absolute left-1/2 top-3.5 flex flex-col items-center transition-opacity duration-500 ${
              scrollHeight > 14 ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          >
            <span className="h-8 w-[2px] bg-[#D4A853]" />
            <span className="h-3.5 w-3.5 rounded-full border border-[#ECD08B] bg-gradient-to-br from-[#F3D999] to-[#9E732B] shadow" />
            <span className="mt-0.5 h-9 w-5 rounded-t-sm rounded-b-lg bg-gradient-to-b from-[#B82934] via-[#8E1620] to-[#4A080F] shadow-[0_6px_12px_rgba(0,0,0,0.6)]" />
          </span>
        </div>

        {/* Unrolling Velvet Scroll with Slow-Motion Parting Crimson Curtains */}
        <div
          id="save-the-date-scroll"
          className="relative -mt-2 overflow-hidden pt-2"
          style={{
            height: `${scrollHeight}px`,
            transition: isDragging ? 'none' : 'height 1.35s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div
            ref={contentRef}
            className="relative mx-3 overflow-hidden rounded-b-2xl border border-t-0 border-[#D4A853]/40 px-5 pb-7 pt-8 shadow-[0_24px_50px_rgba(0,0,0,0.75)] sm:px-7"
            style={{
              background: 'linear-gradient(180deg, #1E1217 0%, #150D11 55%, #110A0D 100%)',
            }}
          >
            <motion.div
              aria-hidden="true"
              className="mini-curtain-left pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 border-r border-[#D4A853]/35"
              animate={{x: isExpanded ? '-102%' : '0%'}}
              transition={{duration: 1.35, delay: 0.2, ease: [0.42, 0, 0.2, 1]}}
            />
            <motion.div
              aria-hidden="true"
              className="mini-curtain-right pointer-events-none absolute inset-y-0 right-0 z-10 w-1/2 border-l border-[#D4A853]/35"
              animate={{x: isExpanded ? '102%' : '0%'}}
              transition={{duration: 1.35, delay: 0.2, ease: [0.42, 0, 0.2, 1]}}
            />

            <div className="font-display text-6xl font-medium leading-none text-[#ECD08B] sm:text-7xl tabular-nums">
              {weddingConfig.dateDisplayDay}
            </div>
            <div className="font-display mt-1 text-3xl italic text-[#F5ECE0]">
              {weddingConfig.dateDisplayMonth}{' '}
              <span className="not-italic text-[#C2B09E]">{weddingConfig.dateDisplayYear}</span>
            </div>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-[#D4A853]">
              {weddingConfig.dateLine}
            </p>
            <p className="mt-1.5 text-sm text-[#C2B09E]">{weddingConfig.summaryLine}</p>

            <div
              aria-label="Countdown to the wedding"
              className="mt-6 grid grid-cols-4 gap-2 sm:gap-3"
            >
              {[
                {label: 'Days', value: String(countdown.days)},
                {label: 'Hours', value: pad(countdown.hours)},
                {label: 'Minutes', value: pad(countdown.minutes)},
                {label: 'Seconds', value: pad(countdown.seconds)},
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[#D4A853]/30 bg-[#0B0709]/85 px-1 py-3"
                >
                  <div className="font-display text-2xl font-semibold leading-none tabular-nums text-[#F5ECE0] sm:text-3xl">
                    {item.value}
                  </div>
                  <div className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#C2B09E]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#D4A853]/50 bg-[#9E1B24] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-[#F5ECE0] transition-colors hover:bg-[#B82934] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECD08B]"
              >
                <CalendarPlus className="h-4 w-4 text-[#ECD08B]" aria-hidden="true" />
                <span>Add to Calendar</span>
              </a>

              <button
                type="button"
                onClick={() => downloadIcsFile()}
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-[#D4A853]/35 bg-transparent px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[#ECD08B] transition-colors hover:border-[#ECD08B] hover:bg-[#1E1217] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECD08B]"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                <span>.ICS</span>
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => toggleExpand(!isExpanded)}
          className={`min-h-[44px] cursor-pointer px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-[#C2B09E] transition-colors hover:text-[#ECD08B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECD08B] ${
            isExpanded ? 'mt-4' : 'mt-24'
          }`}
        >
          {isExpanded ? '↑ Pull up to close' : '↓ Pull the tassel down'}
        </button>
      </div>
    </section>
  );
}
