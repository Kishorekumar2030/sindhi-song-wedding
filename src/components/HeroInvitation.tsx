import {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion, useInView} from 'motion/react';
import {MailOpen, Sparkles} from 'lucide-react';
import {weddingConfig} from '../data/weddingData';

function FloralToran() {
  const garlandPoints = [70, 140, 210, 280, 350, 420, 490, 560, 630];

  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden pt-2">
      <svg
        viewBox="0 0 700 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="toranGold" x1="0" y1="0" x2="700" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9E732B" />
            <stop offset="50%" stopColor="#ECD08B" />
            <stop offset="100%" stopColor="#9E732B" />
          </linearGradient>
          <linearGradient id="toranLeaf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A6B3F" />
            <stop offset="100%" stopColor="#283D22" />
          </linearGradient>
        </defs>

        <path
          d="M12 12 Q180 34 350 18 Q520 34 688 12"
          stroke="url(#toranGold)"
          strokeWidth="2"
          fill="none"
        />

        {garlandPoints.map((x, idx) => (
          <g key={idx}>
            <path
              d={`M ${x - 24} 16 C ${x - 30} 36 ${x - 20} 50 ${x - 16} 56 C ${x - 10} 44 ${x - 14} 28 ${x - 24} 16 Z`}
              fill="url(#toranLeaf)"
              stroke="#D4A853"
              strokeOpacity="0.35"
              strokeWidth="0.7"
            />
            <path
              d={`M ${x + 24} 16 C ${x + 30} 36 ${x + 20} 50 ${x + 16} 56 C ${x + 10} 44 ${x + 14} 28 ${x + 24} 16 Z`}
              fill="url(#toranLeaf)"
              stroke="#D4A853"
              strokeOpacity="0.35"
              strokeWidth="0.7"
            />
            <circle cx={x} cy={35} r="8" fill="#8C1D24" stroke="#ECD08B" strokeWidth="1.2" />
            <circle cx={x} cy={35} r="4" fill="#D4A853" />
            <line
              x1={x}
              y1={43}
              x2={x}
              y2={62}
              stroke="#D4A853"
              strokeOpacity="0.7"
              strokeWidth="1.2"
            />
            <circle cx={x} cy={66} r="4.5" fill="#ECD08B" />
            <circle cx={x} cy={74} r="2.2" fill="#9E1B24" />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function HeroInvitation({isCoverOpened}: {isCoverOpened: boolean}) {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const isEnvelopeInView = useInView(envelopeRef, {once: true, amount: 0.35});

  useEffect(() => {
    if (!isCoverOpened || !isEnvelopeInView) return;
    const timer = window.setTimeout(() => {
      setEnvelopeOpen(true);
    }, 450);
    return () => window.clearTimeout(timer);
  }, [isCoverOpened, isEnvelopeInView]);

  return (
    <section
      id="invitation"
      className="relative mx-auto max-w-5xl px-4 pb-12 pt-4 sm:px-6 sm:pb-16 lg:px-8"
    >
      <FloralToran />

      <div className="mt-4 text-center">
        <p
          className={
            weddingConfig.invocationIsDevanagari
              ? 'font-dev text-sm tracking-[0.14em] text-[#ECD08B] sm:text-base'
              : 'text-xs font-medium uppercase tracking-[0.28em] text-[#ECD08B]'
          }
        >
          {weddingConfig.invocation}
        </p>
      </div>

      {/* Arched Royal Dark Velvet Invitation Card */}
      <motion.div
        initial={{opacity: 0, y: 24}}
        animate={isCoverOpened ? {opacity: 1, y: 0} : {opacity: 0.7, y: 12}}
        transition={{duration: 1.2, ease: [0.22, 1, 0.36, 1]}}
        className="relative mx-auto mt-6 max-w-2xl"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-4 rounded-t-[360px] rounded-b-[40px] opacity-40 blur-2xl"
          style={{
            background:
              'radial-gradient(circle at 50% 35%, rgba(212,168,83,0.18), rgba(158,27,36,0.16) 55%, transparent 78%)',
          }}
        />

        <div
          className="relative overflow-hidden rounded-t-[280px] rounded-b-3xl border border-[#D4A853]/35 px-6 pb-12 pt-14 text-center shadow-[0_28px_70px_rgba(0,0,0,0.75)] sm:rounded-t-[340px] sm:px-14 sm:pb-16 sm:pt-20"
          style={{
            background: 'radial-gradient(circle at 50% 24%, #281119 0%, #160C11 58%, #10080B 100%)',
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 rounded-t-[268px] rounded-b-2xl border border-[#D4A853]/25 sm:inset-4 sm:rounded-t-[324px]"
          />

          <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#D4A853]/50 bg-[#0B0709]/80 shadow-[0_0_26px_rgba(212,168,83,0.22)]">
            <span
              className={
                weddingConfig.coverEmblemType === 'devanagari'
                  ? 'font-dev text-3xl leading-none text-[#ECD08B]'
                  : 'font-display text-xl font-medium italic tracking-wide text-[#ECD08B]'
              }
            >
              {weddingConfig.coverEmblem}
            </span>
          </div>

          <p className="relative z-10 mt-6 text-[11px] font-medium uppercase tracking-[0.28em] text-[#C2B09E] sm:text-xs">
            {weddingConfig.heroLead}
          </p>

          <div className="relative z-10 mt-7">
            <h1 className="font-display text-5xl font-medium tracking-wide text-[#F5ECE0] sm:text-6xl lg:text-[68px]">
              {weddingConfig.groom}
            </h1>
            <p className="mt-2 text-sm text-[#C2B09E] sm:text-base">
              Son of{' '}
              <span className="font-medium text-[#ECD08B]">{weddingConfig.groomParents}</span>
            </p>
          </div>

          <div className="relative z-10 my-6 flex items-center justify-center gap-5">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4A853]/65 sm:w-24" />
            <span className="font-display text-4xl italic leading-none text-[#ECD08B]">&amp;</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4A853]/65 sm:w-24" />
          </div>

          <div className="relative z-10">
            <h2 className="font-display text-5xl font-medium tracking-wide text-[#F5ECE0] sm:text-6xl lg:text-[68px]">
              {weddingConfig.bride}
            </h2>
            <p className="mt-2 text-sm text-[#C2B09E] sm:text-base">
              Daughter of{' '}
              <span className="font-medium text-[#ECD08B]">{weddingConfig.brideParents}</span>
            </p>
          </div>

          <p className="relative z-10 mx-auto mt-8 max-w-md text-sm leading-relaxed text-[#C2B09E] sm:text-base">
            joyfully invite you to share in the blessings and celebration of their wedding.
          </p>
        </div>
      </motion.div>

      {/* Story Quote */}
      <div className="mx-auto mt-12 max-w-2xl px-2 text-center sm:mt-14">
        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-[#D4A853]/35" />
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-[#D4A853]"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
          </svg>
          <span className="h-px w-12 bg-[#D4A853]/35" />
        </div>

        <p className="font-display text-2xl font-normal leading-relaxed text-[#F5ECE0]/95 sm:text-[28px]">
          {weddingConfig.storyLead}{' '}
          <em className="italic text-[#ECD08B]">{weddingConfig.storyHighlight}</em>.{' '}
          {weddingConfig.storyTail}
        </p>
      </div>

      {/* Auto-Opening Dark Velvet Ribbon & Curtain Family Blessing Envelope */}
      <div ref={envelopeRef} className="mx-auto mt-10 max-w-lg">
        <div className="velvet-card-surface relative overflow-hidden rounded-2xl border border-[#D4A853]/35 p-5 text-center shadow-[0_20px_50px_rgba(0,0,0,0.7)] sm:p-6">
          <button
            type="button"
            onClick={() => setEnvelopeOpen((prev) => !prev)}
            aria-expanded={envelopeOpen}
            className="group relative z-20 flex w-full cursor-pointer flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECD08B]"
          >
            <div className="relative flex w-full items-center justify-center py-2">
              <div
                aria-hidden="true"
                className="h-2.5 flex-1 rounded-l-full transition-all duration-700"
                style={{
                  background: 'linear-gradient(180deg, #6E1019 0%, #9E1B24 50%, #6E1019 100%)',
                  opacity: envelopeOpen ? 0.45 : 0.95,
                }}
              />
              <motion.div
                className="mx-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#ECD08B] bg-gradient-to-br from-[#F3D999] to-[#9E732B] text-[#1C0A0E] shadow-md"
                animate={{rotate: envelopeOpen ? 180 : 0, scale: envelopeOpen ? 0.92 : 1}}
                transition={{duration: 0.9, ease: [0.22, 1, 0.36, 1]}}
              >
                <MailOpen className="h-5 w-5 text-[#1C0A0E]" aria-hidden="true" />
              </motion.div>
              <div
                aria-hidden="true"
                className="h-2.5 flex-1 rounded-r-full transition-all duration-700"
                style={{
                  background: 'linear-gradient(180deg, #6E1019 0%, #9E1B24 50%, #6E1019 100%)',
                  opacity: envelopeOpen ? 0.45 : 0.95,
                }}
              />
            </div>

            <p className="font-display mt-2 text-2xl font-medium text-[#F5ECE0]">
              A Blessing Note from Our Families
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-[#D4A853] transition-colors group-hover:text-[#ECD08B]">
              {envelopeOpen ? 'Sealed With Love · Tap to Fold' : 'Unfolding Family Blessing...'}
            </p>
          </button>

          <AnimatePresence initial={false}>
            {envelopeOpen && (
              <motion.div
                initial={{opacity: 0, height: 0}}
                animate={{opacity: 1, height: 'auto'}}
                exit={{opacity: 0, height: 0}}
                transition={{duration: 1.05, ease: [0.22, 1, 0.36, 1]}}
                className="relative overflow-hidden"
              >
                <div className="relative mt-5 overflow-hidden rounded-xl border border-[#D4A853]/35 bg-[#0E080B] px-5 py-6 text-center shadow-[inset_0_0_24px_rgba(158,27,36,0.22)]">
                  <motion.div
                    aria-hidden="true"
                    className="mini-curtain-left pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 border-r border-[#D4A853]/40"
                    initial={{x: '0%'}}
                    animate={{x: '-102%'}}
                    exit={{x: '0%'}}
                    transition={{duration: 1.25, ease: [0.42, 0, 0.2, 1]}}
                  />
                  <motion.div
                    aria-hidden="true"
                    className="mini-curtain-right pointer-events-none absolute inset-y-0 right-0 z-10 w-1/2 border-l border-[#D4A853]/40"
                    initial={{x: '0%'}}
                    animate={{x: '102%'}}
                    exit={{x: '0%'}}
                    transition={{duration: 1.25, ease: [0.42, 0, 0.2, 1]}}
                  />

                  <div className="mx-auto mb-3 flex items-center justify-center gap-2 text-[#D4A853]">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <p className="font-display text-xl italic leading-relaxed text-[#F5ECE0] sm:text-2xl">
                    “Your presence is the greatest gift we could ask for as{' '}
                    {weddingConfig.groom} &amp; {weddingConfig.bride} step into a lifetime of
                    love, warmth, and cherished memories.”
                  </p>
                  <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-[#C2B09E]">
                    {weddingConfig.summaryLine}
                  </p>
                  <p className="font-display mt-3 text-lg font-medium text-[#ECD08B]">
                    — {weddingConfig.closing}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
