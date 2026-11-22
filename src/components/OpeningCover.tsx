import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {weddingConfig} from '../data/weddingData';

interface OpeningCoverProps {
  isOpen: boolean;
  onOpenStart: () => void;
  onOpen: () => void;
}

type CoverStage = 'sealed' | 'untying' | 'doorsOpen' | 'curtainOpen';

export function OpeningCover({isOpen, onOpenStart, onOpen}: OpeningCoverProps) {
  const [stage, setStage] = useState<CoverStage>('sealed');

  useEffect(() => {
    if (isOpen) return;

    setStage('sealed');

    const t1 = window.setTimeout(() => {
      setStage('untying');
    }, 650);

    const t2 = window.setTimeout(() => {
      setStage('doorsOpen');
    }, 1750);

    const t3 = window.setTimeout(() => {
      setStage('curtainOpen');
    }, 2950);

    const t4 = window.setTimeout(() => {
      onOpen();
    }, 4350);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, [isOpen, onOpen]);

  if (isOpen) return null;

  const handleUserInteraction = () => {
    onOpenStart();
    if (stage === 'sealed') {
      setStage('untying');
    }
  };

  const isUntied = stage !== 'sealed';
  const areDoorsOpen = stage === 'doorsOpen' || stage === 'curtainOpen';
  const isCurtainOpen = stage === 'curtainOpen';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Wedding Invitation Cover"
      onClick={handleUserInteraction}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-5 py-8"
    >
      {/* Obsidian Velvet Scrim Behind Curtains */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[#080406]"
        animate={{opacity: isCurtainOpen ? 0 : 1}}
        transition={{duration: 1.15, delay: isCurtainOpen ? 0.25 : 0, ease: [0.22, 1, 0.36, 1]}}
      />

      {/* Top Royal Crimson & Antique Gold Valance */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-20 h-14 border-b border-[#D4A853]/45 shadow-[0_8px_28px_rgba(0,0,0,0.75)]"
        style={{
          background:
            'linear-gradient(180deg, #3D0711 0%, #580D1B 55%, #2B050C 100%)',
        }}
        animate={{y: isCurtainOpen ? '-110%' : '0%', opacity: isCurtainOpen ? 0 : 1}}
        transition={{duration: 1.25, ease: [0.45, 0, 0.25, 1]}}
      >
        <div className="mx-auto flex h-full max-w-5xl items-end justify-around pb-1.5 opacity-85">
          {Array.from({length: 9}).map((_, i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 rounded-full border border-[#ECD08B] bg-[#9E1B24] shadow-[0_0_8px_rgba(212,168,83,0.45)]"
            />
          ))}
        </div>
      </motion.div>

      {/* Left Deep Crimson Velvet Pleated Curtain */}
      <motion.div
        aria-hidden="true"
        className="silk-curtain-left pointer-events-none fixed inset-y-0 left-0 z-10 w-1/2 border-r border-[#D4A853]/45 shadow-[14px_0_48px_rgba(0,0,0,0.85)]"
        initial={{x: '0%'}}
        animate={{x: isCurtainOpen ? '-105%' : '0%'}}
        transition={{duration: 1.35, ease: [0.42, 0, 0.2, 1]}}
      >
        <div className="absolute inset-y-0 right-2.5 w-[2px] bg-gradient-to-b from-[#ECD08B] via-[#9E732B] to-[#ECD08B] opacity-65" />
      </motion.div>

      {/* Right Deep Crimson Velvet Pleated Curtain */}
      <motion.div
        aria-hidden="true"
        className="silk-curtain-right pointer-events-none fixed inset-y-0 right-0 z-10 w-1/2 border-l border-[#D4A853]/45 shadow-[-14px_0_48px_rgba(0,0,0,0.85)]"
        initial={{x: '0%'}}
        animate={{x: isCurtainOpen ? '105%' : '0%'}}
        transition={{duration: 1.35, ease: [0.42, 0, 0.2, 1]}}
      >
        <div className="absolute inset-y-0 left-2.5 w-[2px] bg-gradient-to-b from-[#ECD08B] via-[#9E732B] to-[#ECD08B] opacity-65" />
      </motion.div>

      {/* Ambient Antique Gold & Crimson Glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-20 h-[460px] w-[460px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(212,168,83,0.22) 0%, rgba(158,27,36,0.24) 48%, transparent 74%)',
        }}
        animate={{opacity: isCurtainOpen ? 0 : 0.9, scale: isCurtainOpen ? 1.15 : 1}}
        transition={{duration: 1.0}}
      />

      {/* Center Royal Velvet Gatefold Card Tied With Crimson & Gold Dori */}
      <motion.div
        className="relative z-30 flex flex-col items-center"
        animate={{
          opacity: isCurtainOpen ? 0 : 1,
          scale: isCurtainOpen ? 0.95 : 1,
          y: isCurtainOpen ? -18 : 0,
        }}
        transition={{duration: 1.05, delay: isCurtainOpen ? 0.12 : 0, ease: [0.22, 1, 0.36, 1]}}
      >
        <button
          type="button"
          onClick={handleUserInteraction}
          className="book-float group relative w-[294px] cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECD08B] sm:w-[338px]"
          style={{perspective: '1800px'}}
          aria-label={`Wedding invitation for ${weddingConfig.groom} and ${weddingConfig.bride}`}
        >
          <div className="relative aspect-[3/4.25] w-full" style={{transformStyle: 'preserve-3d'}}>
            {/* Inner Invitation Preview */}
            <div className="velvet-card-surface absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-[#D4A853]/55 p-6 text-center shadow-[0_26px_60px_rgba(0,0,0,0.85)]">
              <div className="pointer-events-none absolute inset-3 rounded-xl border border-[#D4A853]/35" />
              <div className="pointer-events-none absolute inset-[18px] rounded-lg border border-[#D4A853]/18" />

              <span
                className={
                  weddingConfig.invocationIsDevanagari
                    ? 'font-dev text-xs tracking-[0.14em] text-[#ECD08B]'
                    : 'text-[10px] font-medium uppercase tracking-[0.26em] text-[#ECD08B]'
                }
              >
                {weddingConfig.invocation}
              </span>
              <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#D4A853]/60 bg-[#0B0709]/85 shadow-sm">
                <span
                  className={
                    weddingConfig.coverEmblemType === 'devanagari'
                      ? 'font-dev text-2xl leading-none text-[#ECD08B]'
                      : 'font-display text-lg font-semibold italic text-[#ECD08B]'
                  }
                >
                  {weddingConfig.coverEmblem}
                </span>
              </div>
              <p className="font-display mt-4 text-4xl font-medium italic tracking-wide text-[#F5ECE0]">
                {weddingConfig.groom}
              </p>
              <span className="font-display my-1 text-2xl italic text-[#D4A853]">&amp;</span>
              <p className="font-display text-4xl font-medium italic tracking-wide text-[#F5ECE0]">
                {weddingConfig.bride}
              </p>
              <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.26em] text-[#C2B09E] tabular-nums">
                {weddingConfig.coverYearLine}
              </p>
            </div>

            {/* Gatefold Left Door */}
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2 overflow-hidden rounded-l-2xl border border-r-[0.5px] border-[#D4A853]/45"
              style={{
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                background:
                  'linear-gradient(155deg, #5F0E1B 0%, #3E0710 48%, #220409 100%)',
                boxShadow:
                  'inset 8px 0 18px rgba(0,0,0,0.55), 0 18px 40px rgba(0,0,0,0.75)',
              }}
              animate={{rotateY: areDoorsOpen ? -136 : 0}}
              transition={{duration: 1.15, ease: [0.42, 0, 0.2, 1]}}
            >
              <div className="pointer-events-none absolute inset-3 right-1.5 rounded-l-xl border border-r-0 border-[#D4A853]/50" />
              <svg
                aria-hidden="true"
                viewBox="0 0 80 80"
                className="pointer-events-none absolute left-3 top-3 h-10 w-10 text-[#ECD08B]/60"
                fill="none"
              >
                <path
                  d="M12 12C26 14 36 22 42 36M12 12C14 26 22 36 36 42"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <circle cx="18" cy="18" r="2.5" fill="#D4A853" />
              </svg>
            </motion.div>

            {/* Gatefold Right Door */}
            <motion.div
              className="absolute inset-y-0 right-0 w-1/2 overflow-hidden rounded-r-2xl border border-l-[0.5px] border-[#D4A853]/45"
              style={{
                transformOrigin: 'right center',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                background:
                  'linear-gradient(205deg, #5F0E1B 0%, #3E0710 48%, #220409 100%)',
                boxShadow:
                  'inset -8px 0 18px rgba(0,0,0,0.55), 0 18px 40px rgba(0,0,0,0.75)',
              }}
              animate={{rotateY: areDoorsOpen ? 136 : 0}}
              transition={{duration: 1.15, ease: [0.42, 0, 0.2, 1]}}
            >
              <div className="pointer-events-none absolute inset-3 left-1.5 rounded-r-xl border border-l-0 border-[#D4A853]/50" />
              <svg
                aria-hidden="true"
                viewBox="0 0 80 80"
                className="pointer-events-none absolute right-3 top-3 h-10 w-10 text-[#ECD08B]/60"
                fill="none"
              >
                <path
                  d="M68 12C54 14 44 22 38 36M68 12C66 26 58 36 44 42"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <circle cx="62" cy="18" r="2.5" fill="#D4A853" />
              </svg>
            </motion.div>

            {/* Front Cover Typography Overlay */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-between p-5 text-center"
              animate={{opacity: areDoorsOpen ? 0 : 1}}
              transition={{duration: 0.6}}
            >
              <div className="pt-4">
                <p
                  className={
                    weddingConfig.invocationIsDevanagari
                      ? 'font-dev text-[12px] tracking-[0.14em] text-[#ECD08B]/90'
                      : 'text-[10px] font-medium uppercase tracking-[0.26em] text-[#ECD08B]/90'
                  }
                >
                  {weddingConfig.invocation}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#D4A853]/65 bg-[#1B0408]/80 shadow-[0_0_24px_rgba(212,168,83,0.22)]">
                  <span
                    className={
                      weddingConfig.coverEmblemType === 'devanagari'
                        ? 'font-dev text-4xl leading-none text-[#ECD08B]'
                        : 'font-display text-2xl font-semibold italic tracking-wide text-[#ECD08B]'
                    }
                  >
                    {weddingConfig.coverEmblem}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <span className="h-px w-7 bg-[#D4A853]/55" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#ECD08B]/85">
                    {weddingConfig.coverSubtitle}
                  </span>
                  <span className="h-px w-7 bg-[#D4A853]/55" />
                </div>

                <h1 className="font-display mt-3 text-[23px] font-semibold tracking-[0.14em] text-[#F5ECE0] sm:text-[25px]">
                  {weddingConfig.coverTitle}
                </h1>
                <p className="font-display mt-2 text-lg italic text-[#ECD08B]">
                  {weddingConfig.groom} &amp; {weddingConfig.bride}
                </p>
              </div>

              <div className="pb-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#C2B09E]">
                  {weddingConfig.coverFooter}
                </p>
              </div>
            </motion.div>

            {/* Vertical Woven Crimson & Antique Gold Dori / Ribbon */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-5 -translate-x-1/2"
              style={{
                background:
                  'linear-gradient(90deg, #6E1019 0%, #9E1B24 30%, #C62834 50%, #9E1B24 70%, #6E1019 100%)',
                boxShadow: '0 0 16px rgba(0,0,0,0.65)',
              }}
              animate={{
                scaleY: isUntied ? 0 : 1,
                opacity: isUntied ? 0 : 0.96,
              }}
              transition={{duration: 0.95, ease: [0.32, 0.72, 0, 1]}}
            >
              <div className="absolute inset-y-0 left-[3px] w-px bg-[#ECD08B]/80" />
              <div className="absolute inset-y-0 right-[3px] w-px bg-[#ECD08B]/80" />
            </motion.div>

            {/* Horizontal Crimson & Gold Silk Ribbon */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-[54%] z-20 h-6 -translate-y-1/2"
              style={{
                background:
                  'linear-gradient(180deg, #6E1019 0%, #9E1B24 28%, #C62834 50%, #9E1B24 72%, #6E1019 100%)',
                boxShadow: '0 4px 18px rgba(0,0,0,0.7)',
              }}
              animate={{
                scaleX: isUntied ? 0.1 : 1,
                opacity: isUntied ? 0 : 0.98,
              }}
              transition={{duration: 0.95, ease: [0.32, 0.72, 0, 1]}}
            >
              <div className="absolute inset-x-0 top-[3px] h-px bg-[#ECD08B]/80" />
              <div className="absolute inset-x-0 bottom-[3px] h-px bg-[#ECD08B]/80" />
            </motion.div>

            {/* Center Crimson & Gold Silk Bow + Antique Gold Wax Seal */}
            <AnimatePresence>
              {!isUntied && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-[54%] z-30 -translate-x-1/2 -translate-y-1/2"
                  initial={{scale: 1, opacity: 1}}
                  exit={{scale: 1.25, opacity: 0, rotate: 14}}
                  transition={{duration: 0.85, ease: [0.22, 1, 0.36, 1]}}
                >
                  <svg
                    viewBox="0 0 180 120"
                    className="h-28 w-44 drop-shadow-[0_8px_18px_rgba(0,0,0,0.75)]"
                    fill="none"
                  >
                    <path
                      d="M84 58 C74 82, 62 96, 52 114"
                      stroke="#9E1B24"
                      strokeWidth="4.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M96 58 C106 82, 118 96, 128 114"
                      stroke="#87141C"
                      strokeWidth="4.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M84 58 C74 82, 62 96, 52 114"
                      stroke="#ECD08B"
                      strokeWidth="1.1"
                      strokeDasharray="2 3"
                    />
                    <path
                      d="M96 58 C106 82, 118 96, 128 114"
                      stroke="#ECD08B"
                      strokeWidth="1.1"
                      strokeDasharray="2 3"
                    />
                    <path
                      d="M86 52 C56 26, 20 34, 24 54 C28 72, 62 66, 86 55 Z"
                      fill="url(#bowGradLeftRoyal)"
                      stroke="#ECD08B"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M94 52 C124 26, 160 34, 156 54 C152 72, 118 66, 94 55 Z"
                      fill="url(#bowGradRightRoyal)"
                      stroke="#ECD08B"
                      strokeWidth="1.2"
                    />
                    <defs>
                      <linearGradient id="bowGradLeftRoyal" x1="24" y1="36" x2="86" y2="62">
                        <stop offset="0%" stopColor="#C9303C" />
                        <stop offset="55%" stopColor="#9E1B24" />
                        <stop offset="100%" stopColor="#5C0B12" />
                      </linearGradient>
                      <linearGradient id="bowGradRightRoyal" x1="156" y1="36" x2="94" y2="62">
                        <stop offset="0%" stopColor="#C9303C" />
                        <stop offset="55%" stopColor="#9E1B24" />
                        <stop offset="100%" stopColor="#5C0B12" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="seal-glow absolute left-1/2 top-[44%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#ECD08B] bg-gradient-to-br from-[#F3D999] via-[#C6933E] to-[#7D581D] text-[#1C0A0E] shadow-lg">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1C0A0E]/35">
                      <span
                        className={
                          weddingConfig.coverEmblemType === 'devanagari'
                            ? 'font-dev text-lg leading-none font-bold text-[#1C0A0E]'
                            : 'font-display text-xs font-bold tracking-wider text-[#1C0A0E]'
                        }
                      >
                        {weddingConfig.coverEmblem}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>

        <p className="mt-7 rounded-full border border-[#D4A853]/45 bg-[#150D11]/90 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.22em] text-[#ECD08B] shadow-[0_10px_28px_rgba(0,0,0,0.7)]">
          {stage === 'sealed' ? 'Unveiling Your Invitation...' : 'Opening in Slow Motion...'}
        </p>
      </motion.div>
    </div>
  );
}
