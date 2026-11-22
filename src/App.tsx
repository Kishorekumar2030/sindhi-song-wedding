import {useCallback, useEffect, useRef, useState} from 'react';
import {Volume2, VolumeX} from 'lucide-react';
import {weddingConfig} from './data/weddingData';
import {OpeningCover} from './components/OpeningCover';
import {FloatingPetals} from './components/FloatingPetals';
import {Header} from './components/Header';
import {HeroInvitation} from './components/HeroInvitation';
import {SaveTheDateScroll} from './components/SaveTheDateScroll';
import {FestivitiesSection} from './components/FestivitiesSection';
import {VenueAndRsvpSection} from './components/VenueAndRsvpSection';
import {Footer} from './components/Footer';
import {MusicPlayer, type MusicPlayerHandle} from './components/MusicPlayer';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const musicRef = useRef<MusicPlayerHandle>(null);
  const musicStartedRef = useRef(false);

  useEffect(() => {
    document.title = weddingConfig.pageTitle;
  }, []);

  const ensureMusicStarted = useCallback(() => {
    if (musicStartedRef.current) return;
    musicStartedRef.current = true;
    musicRef.current?.play();
  }, []);

  useEffect(() => {
    const onFirstGesture = () => {
      ensureMusicStarted();
    };
    window.addEventListener('pointerdown', onFirstGesture, {once: true, passive: true});
    window.addEventListener('touchstart', onFirstGesture, {once: true, passive: true});
    window.addEventListener('keydown', onFirstGesture, {once: true});
    return () => {
      window.removeEventListener('pointerdown', onFirstGesture);
      window.removeEventListener('touchstart', onFirstGesture);
      window.removeEventListener('keydown', onFirstGesture);
    };
  }, [ensureMusicStarted]);

  const handleOpenStart = useCallback(() => {
    ensureMusicStarted();
  }, [ensureMusicStarted]);

  const handleOpenComplete = useCallback(() => {
    setIsOpened(true);
  }, []);

  const handleToggleMusic = useCallback(() => {
    musicStartedRef.current = true;
    musicRef.current?.toggle();
  }, []);

  const handleReplayCover = useCallback(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    setIsOpened(false);
  }, []);

  return (
    <div
      className="relative min-h-screen bg-[#0B0709] text-[#F5ECE0]"
      style={{
        background:
          'radial-gradient(circle at 20% 8%, #1C0A11 0%, #10070B 45%, #0B0709 100%)',
      }}
    >
      <MusicPlayer ref={musicRef} onPlayingChange={setIsPlaying} />
      <FloatingPetals />

      <OpeningCover
        isOpen={isOpened}
        onOpenStart={handleOpenStart}
        onOpen={handleOpenComplete}
      />

      <Header />

      <main className="relative z-20">
        <HeroInvitation isCoverOpened={isOpened} />
        <SaveTheDateScroll />
        <FestivitiesSection />
        <VenueAndRsvpSection />
      </main>

      <Footer onReplayCover={handleReplayCover} />

      {isOpened && (
        <button
          type="button"
          onClick={handleToggleMusic}
          title={weddingConfig.songTitle}
          aria-label={
            isPlaying
              ? `Pause ${weddingConfig.songTitle}`
              : `Play ${weddingConfig.songTitle}`
          }
          aria-pressed={isPlaying}
          className="fixed bottom-4 right-4 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#D4A853]/55 bg-[#150D11]/95 text-[#ECD08B] shadow-[0_8px_24px_rgba(0,0,0,0.75)] backdrop-blur-md transition-colors hover:border-[#ECD08B] hover:bg-[#241319] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECD08B]"
        >
          {isPlaying ? (
            <Volume2 className="h-4 w-4" aria-hidden="true" />
          ) : (
            <VolumeX className="h-4 w-4 text-[#C2B09E]" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}
