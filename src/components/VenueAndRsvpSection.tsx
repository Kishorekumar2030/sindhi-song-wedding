import {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion, useInView} from 'motion/react';
import {Check, ChevronDown, Copy, HeartHandshake, MapPin, Navigation, Send} from 'lucide-react';
import {getGoogleMapsUrl, weddingConfig} from '../data/weddingData';

function StylizedVenueMap() {
  return (
    <svg
      viewBox="0 0 420 260"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-label={`Stylized map of ${weddingConfig.address}`}
    >
      <rect width="420" height="260" fill="#120B0F" />
      <g fill="#191015" stroke="#2B1C23" strokeWidth="0.8">
        <rect x="20" y="16" width="66" height="44" rx="4" />
        <rect x="108" y="18" width="84" height="42" rx="4" />
        <rect x="218" y="14" width="76" height="48" rx="4" />
        <rect x="314" y="18" width="86" height="46" rx="4" />
        <rect x="24" y="88" width="62" height="58" rx="4" />
        <rect x="112" y="92" width="78" height="52" rx="4" />
        <rect x="218" y="90" width="84" height="54" rx="4" />
        <rect x="322" y="94" width="78" height="58" rx="4" />
        <rect x="22" y="176" width="68" height="64" rx="4" />
        <rect x="114" y="174" width="80" height="62" rx="4" />
        <rect x="216" y="176" width="88" height="62" rx="4" />
      </g>

      <path
        d="M-10 218 Q130 198 250 226 T430 202"
        fill="none"
        stroke="#1C2A35"
        strokeWidth="16"
      />
      <path
        d="M-10 218 Q130 198 250 226 T430 202"
        fill="none"
        stroke="#273B4B"
        strokeWidth="1.2"
        strokeOpacity="0.6"
      />

      <g stroke="#2F2128" strokeLinecap="round">
        <path d="M0 74 H420" strokeWidth="9" />
        <path d="M0 160 H420" strokeWidth="7" />
        <path d="M98 0 V260" strokeWidth="8" />
        <path d="M204 0 V260" strokeWidth="8" />
        <path d="M308 0 V260" strokeWidth="6" />
      </g>

      <path
        d="M52 214 Q146 164 204 156 T274 108"
        fill="none"
        stroke="#D4A853"
        strokeWidth="3"
        strokeDasharray="6 5"
        strokeLinecap="round"
      />

      <text
        x="114"
        y="66"
        fill="#A48C78"
        fontSize="10"
        letterSpacing="3"
        fontFamily="Plus Jakarta Sans, sans-serif"
      >
        {weddingConfig.mapAreaLabel}
      </text>
      <text
        x="295"
        y="240"
        fill="#8E7866"
        fontSize="10"
        letterSpacing="2.5"
        fontFamily="Plus Jakarta Sans, sans-serif"
      >
        {weddingConfig.mapCityLabel}
      </text>

      <circle cx="274" cy="108" r="24" fill="#9E1B24" fillOpacity="0.22" />
      <circle cx="274" cy="108" r="14" fill="#D4A853" fillOpacity="0.2" />
      <path
        d="M274 72 C263 72 254 81 254 92 C254 107 274 126 274 126 C274 126 294 107 294 92 C294 81 285 72 274 72 Z"
        fill="#B82934"
        stroke="#ECD08B"
        strokeWidth="1.6"
      />
      <circle cx="274" cy="92" r="6" fill="#F5ECE0" />
    </svg>
  );
}

export function VenueAndRsvpSection() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [venueOpen, setVenueOpen] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);

  const venueRef = useRef<HTMLDivElement>(null);
  const rsvpRef = useRef<HTMLDivElement>(null);
  const isVenueInView = useInView(venueRef, {once: true, amount: 0.25});
  const isRsvpInView = useInView(rsvpRef, {once: true, amount: 0.25});
  const venueAutoRef = useRef(false);
  const rsvpAutoRef = useRef(false);

  const [guestName, setGuestName] = useState('');
  const [attendance, setAttendance] = useState<'accept' | 'decline'>('accept');
  const [guestCount, setGuestCount] = useState('2');
  const [blessing, setBlessing] = useState('');
  const [submittedRsvp, setSubmittedRsvp] = useState<{
    name: string;
    attendance: 'accept' | 'decline';
    count: string;
    blessing: string;
  } | null>(null);

  useEffect(() => {
    if (!isVenueInView || venueAutoRef.current) return;
    venueAutoRef.current = true;
    const t = window.setTimeout(() => setVenueOpen(true), 280);
    return () => window.clearTimeout(t);
  }, [isVenueInView]);

  useEffect(() => {
    if (!isRsvpInView || rsvpAutoRef.current) return;
    rsvpAutoRef.current = true;
    const t = window.setTimeout(() => setRsvpOpen(true), 360);
    return () => window.clearTimeout(t);
  }, [isRsvpInView]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(weddingConfig.plusCode);
      setCopiedCode(true);
      window.setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      setCopiedCode(false);
    }
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    setSubmittedRsvp({
      name: guestName.trim(),
      attendance,
      count: guestCount,
      blessing: blessing.trim(),
    });
  };

  return (
    <section
      id="venue"
      className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#D4A853]">
          Location &amp; Arrival
        </p>
        <h2 className="font-display mt-2 text-4xl font-medium tracking-wide text-[#F5ECE0] sm:text-5xl">
          How to Reach
        </h2>
      </div>

      {/* Auto-Opening Dark Velvet Venue & Map Folio */}
      <div
        ref={venueRef}
        className="velvet-card-surface mt-10 overflow-hidden rounded-3xl border border-[#D4A853]/30 shadow-[0_24px_60px_rgba(0,0,0,0.75)]"
      >
        <button
          type="button"
          onClick={() => setVenueOpen((prev) => !prev)}
          aria-expanded={venueOpen}
          className="relative flex w-full cursor-pointer items-center justify-between gap-4 border-b border-[#D4A853]/20 bg-[#1B1015] px-6 py-5 text-left transition-colors hover:bg-[#22141A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECD08B]"
        >
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#ECD08B] bg-gradient-to-br from-[#F3D999] to-[#9E732B] text-[#1C0A0E] shadow-md">
              <MapPin className="h-4 w-4 text-[#1C0A0E]" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#D4A853]">
                Venue &amp; Directions Folio
              </p>
              <p className="font-display text-2xl font-medium text-[#F5ECE0]">
                {weddingConfig.venue}
              </p>
            </div>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#D4A853]/40 bg-[#0B0709]/80 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-[#ECD08B] shadow-sm">
            <span>{venueOpen ? 'Close Map' : 'Unfolding Map...'}</span>
            <motion.span
              animate={{rotate: venueOpen ? 180 : 0}}
              transition={{duration: 0.4}}
              className="inline-flex"
            >
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </motion.span>
          </span>
        </button>

        <AnimatePresence initial={false}>
          {venueOpen && (
            <motion.div
              initial={{opacity: 0, height: 0}}
              animate={{opacity: 1, height: 'auto'}}
              exit={{opacity: 0, height: 0}}
              transition={{duration: 1.15, ease: [0.22, 1, 0.36, 1]}}
              className="relative overflow-hidden"
            >
              <motion.div
                aria-hidden="true"
                className="mini-curtain-left pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2 border-r border-[#D4A853]/40"
                initial={{x: '0%'}}
                animate={{x: '-102%'}}
                exit={{x: '0%'}}
                transition={{duration: 1.3, ease: [0.42, 0, 0.2, 1]}}
              />
              <motion.div
                aria-hidden="true"
                className="mini-curtain-right pointer-events-none absolute inset-y-0 right-0 z-20 w-1/2 border-l border-[#D4A853]/40"
                initial={{x: '0%'}}
                animate={{x: '102%'}}
                exit={{x: '0%'}}
                transition={{duration: 1.3, ease: [0.42, 0, 0.2, 1]}}
              />

              <div className="lg:grid lg:grid-cols-12">
                <div className="relative h-60 border-b border-[#D4A853]/20 sm:h-72 lg:col-span-7 lg:h-auto lg:min-h-[320px] lg:border-b-0 lg:border-r">
                  <StylizedVenueMap />
                </div>

                <div className="flex flex-col justify-between p-6 text-left sm:p-8 lg:col-span-5">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#D4A853]">
                      Celebration Venue
                    </p>
                    <h3 className="font-display mt-2 text-3xl font-medium text-[#F5ECE0]">
                      {weddingConfig.venue}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#C2B09E]">
                      {weddingConfig.address}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#D4A853]/18 pt-4">
                      <div className="text-xs text-[#C2B09E]">
                        Plus code ·{' '}
                        <span className="font-medium text-[#ECD08B]">
                          {weddingConfig.plusCode}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        aria-label="Copy Google Plus Code"
                        className="inline-flex min-h-[36px] cursor-pointer items-center gap-1.5 rounded-lg border border-[#D4A853]/30 px-2.5 py-1 text-[11px] font-medium text-[#ECD08B] transition-colors hover:bg-[#1E1217] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECD08B]"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-[#92C86D]" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-7">
                    <a
                      href={getGoogleMapsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-[#D4A853]/50 bg-[#9E1B24] px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[#F5ECE0] transition-colors hover:bg-[#B82934] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECD08B]"
                    >
                      <Navigation className="h-4 w-4 text-[#ECD08B]" aria-hidden="true" />
                      <span>Get Directions</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Auto-Opening Dark Velvet Ribbon & Curtain RSVP Card */}
      <div ref={rsvpRef} className="mx-auto mt-10 max-w-2xl">
        <div className="velvet-card-surface overflow-hidden rounded-3xl border border-[#D4A853]/30 shadow-[0_22px_54px_rgba(0,0,0,0.75)]">
          <button
            type="button"
            onClick={() => setRsvpOpen((prev) => !prev)}
            aria-expanded={rsvpOpen}
            className="group relative flex w-full cursor-pointer flex-col items-center px-6 py-6 text-center transition-colors hover:bg-[#1D1116] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECD08B]"
          >
            <div className="relative flex w-full items-center justify-center">
              <div
                aria-hidden="true"
                className="h-2.5 flex-1 rounded-l-full transition-all duration-700"
                style={{
                  background: 'linear-gradient(180deg, #6E1019 0%, #9E1B24 50%, #6E1019 100%)',
                  opacity: rsvpOpen ? 0.45 : 0.95,
                }}
              />
              <motion.div
                className="mx-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#ECD08B] bg-gradient-to-br from-[#F3D999] to-[#9E732B] text-[#1C0A0E] shadow-md"
                animate={{scale: rsvpOpen ? 0.94 : 1}}
                transition={{duration: 0.45}}
              >
                <HeartHandshake className="h-5 w-5 text-[#1C0A0E]" aria-hidden="true" />
              </motion.div>
              <div
                aria-hidden="true"
                className="h-2.5 flex-1 rounded-r-full transition-all duration-700"
                style={{
                  background: 'linear-gradient(180deg, #6E1019 0%, #9E1B24 50%, #6E1019 100%)',
                  opacity: rsvpOpen ? 0.45 : 0.95,
                }}
              />
            </div>

            <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.24em] text-[#D4A853]">
              Kindly Reply
            </p>
            <h3 className="font-display mt-1 text-3xl font-medium text-[#F5ECE0]">
              RSVP &amp; Blessings Card
            </h3>
            <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#C2B09E]">
              {rsvpOpen ? 'Tap to Fold RSVP Card' : 'Unfolding RSVP Card...'}
            </p>
          </button>

          <AnimatePresence initial={false}>
            {rsvpOpen && (
              <motion.div
                initial={{opacity: 0, height: 0}}
                animate={{opacity: 1, height: 'auto'}}
                exit={{opacity: 0, height: 0}}
                transition={{duration: 1.15, ease: [0.22, 1, 0.36, 1]}}
                className="relative overflow-hidden"
              >
                <motion.div
                  aria-hidden="true"
                  className="mini-curtain-left pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2 border-r border-[#D4A853]/40"
                  initial={{x: '0%'}}
                  animate={{x: '-102%'}}
                  exit={{x: '0%'}}
                  transition={{duration: 1.3, ease: [0.42, 0, 0.2, 1]}}
                />
                <motion.div
                  aria-hidden="true"
                  className="mini-curtain-right pointer-events-none absolute inset-y-0 right-0 z-20 w-1/2 border-l border-[#D4A853]/40"
                  initial={{x: '0%'}}
                  animate={{x: '102%'}}
                  exit={{x: '0%'}}
                  transition={{duration: 1.3, ease: [0.42, 0, 0.2, 1]}}
                />

                <div className="border-t border-[#D4A853]/20 bg-[#10080B] px-6 py-7 sm:px-8">
                  {submittedRsvp ? (
                    <div className="rounded-2xl border border-[#D4A853]/35 bg-[#180E12] p-6 text-center">
                      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#9E1B24] text-[#F5ECE0]">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h4 className="font-display mt-3 text-2xl font-medium text-[#F5ECE0]">
                        Thank You, {submittedRsvp.name}
                      </h4>
                      <p className="mt-1.5 text-sm text-[#C2B09E]">
                        {submittedRsvp.attendance === 'accept'
                          ? `We are delighted to reserve seats for ${submittedRsvp.count} guest${
                              submittedRsvp.count === '1' ? '' : 's'
                            } at ${weddingConfig.venue}.`
                          : 'Thank you for letting us know. Your warm wishes mean the world to us.'}
                      </p>
                      {submittedRsvp.blessing && (
                        <p className="font-display mt-3 text-lg italic text-[#ECD08B]">
                          “{submittedRsvp.blessing}”
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={() => setSubmittedRsvp(null)}
                        className="mt-5 min-h-[40px] cursor-pointer rounded-full border border-[#D4A853]/45 px-5 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#ECD08B] transition-colors hover:bg-[#1E1217] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECD08B]"
                      >
                        Update RSVP
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleRsvpSubmit} className="space-y-4 text-left">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="rsvp-name"
                            className="block text-xs font-medium uppercase tracking-[0.16em] text-[#D4A853]"
                          >
                            Guest Full Name
                          </label>
                          <input
                            id="rsvp-name"
                            type="text"
                            required
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="e.g. Aarav & Meera Sharma"
                            className="mt-1.5 w-full rounded-xl border border-[#D4A853]/30 bg-[#170E12] px-3.5 py-2.5 text-sm text-[#F5ECE0] placeholder:text-[#7E6B5E] focus:border-[#ECD08B] focus:outline-none focus:ring-2 focus:ring-[#ECD08B]/20"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="rsvp-guests"
                            className="block text-xs font-medium uppercase tracking-[0.16em] text-[#D4A853]"
                          >
                            Number of Guests
                          </label>
                          <select
                            id="rsvp-guests"
                            value={guestCount}
                            onChange={(e) => setGuestCount(e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-[#D4A853]/30 bg-[#170E12] px-3.5 py-2.5 text-sm text-[#F5ECE0] focus:border-[#ECD08B] focus:outline-none focus:ring-2 focus:ring-[#ECD08B]/20"
                          >
                            {['1', '2', '3', '4', '5', '6'].map((num) => (
                              <option key={num} value={num}>
                                {num} {num === '1' ? 'Guest' : 'Guests'}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <span className="block text-xs font-medium uppercase tracking-[0.16em] text-[#D4A853]">
                          Your Response
                        </span>
                        <div className="mt-1.5 grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setAttendance('accept')}
                            className={`min-h-[42px] cursor-pointer rounded-xl border px-3 py-2 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECD08B] ${
                              attendance === 'accept'
                                ? 'border-[#ECD08B] bg-[#9E1B24]/45 text-[#F5ECE0]'
                                : 'border-[#D4A853]/25 bg-[#170E12] text-[#C2B09E] hover:bg-[#1E1217]'
                            }`}
                          >
                            Joyfully Accepts
                          </button>
                          <button
                            type="button"
                            onClick={() => setAttendance('decline')}
                            className={`min-h-[42px] cursor-pointer rounded-xl border px-3 py-2 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECD08B] ${
                              attendance === 'decline'
                                ? 'border-[#ECD08B] bg-[#9E1B24]/45 text-[#F5ECE0]'
                                : 'border-[#D4A853]/25 bg-[#170E12] text-[#C2B09E] hover:bg-[#1E1217]'
                            }`}
                          >
                            Regretfully Declines
                          </button>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="rsvp-blessing"
                          className="block text-xs font-medium uppercase tracking-[0.16em] text-[#D4A853]"
                        >
                          Wishes &amp; Blessings (Optional)
                        </label>
                        <textarea
                          id="rsvp-blessing"
                          rows={2}
                          value={blessing}
                          onChange={(e) => setBlessing(e.target.value)}
                          placeholder={`Write a warm wish for ${weddingConfig.groom} & ${weddingConfig.bride}...`}
                          className="mt-1.5 w-full rounded-xl border border-[#D4A853]/30 bg-[#170E12] px-3.5 py-2.5 text-sm text-[#F5ECE0] placeholder:text-[#7E6B5E] focus:border-[#ECD08B] focus:outline-none focus:ring-2 focus:ring-[#ECD08B]/20"
                        />
                      </div>

                      <button
                        type="submit"
                        className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#D4A853]/50 bg-[#9E1B24] px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[#F5ECE0] transition-colors hover:bg-[#B82934] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECD08B]"
                      >
                        <Send className="h-3.5 w-3.5 text-[#ECD08B]" aria-hidden="true" />
                        <span>Send RSVP</span>
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
