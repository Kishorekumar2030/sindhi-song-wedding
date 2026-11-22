import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {weddingConfig} from '../data/weddingData';

export interface MusicPlayerHandle {
  play: () => void;
  pause: () => void;
  toggle: () => void;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        id: string,
        options: {
          events?: {
            onReady?: () => void;
            onStateChange?: (e: {data: number}) => void;
            onError?: () => void;
          };
        }
      ) => {
        unMute: () => void;
        setVolume: (vol: number) => void;
        playVideo: () => void;
        pauseVideo: () => void;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export const MusicPlayer = forwardRef<MusicPlayerHandle, {onPlayingChange: (playing: boolean) => void}>(
  function MusicPlayer({onPlayingChange}, ref) {
    const ytPlayerRef = useRef<InstanceType<NonNullable<typeof window.YT>['Player']> | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const shouldPlayRef = useRef(false);
    const [useFallbackAudio, setUseFallbackAudio] = useState(false);

    const postYtCommand = (func: string, args: unknown[] = []) => {
      const win = iframeRef.current?.contentWindow;
      if (win) {
        win.postMessage(JSON.stringify({event: 'command', func, args}), 'https://www.youtube.com');
      }
    };

    useEffect(() => {
      let cancelled = false;

      const initPlayer = () => {
        if (cancelled || !window.YT?.Player || ytPlayerRef.current) return;
        ytPlayerRef.current = new window.YT.Player('yt-wedding-player', {
          events: {
            onReady: () => {
              if (shouldPlayRef.current && ytPlayerRef.current) {
                ytPlayerRef.current.unMute();
                ytPlayerRef.current.setVolume(88);
                ytPlayerRef.current.playVideo();
              }
            },
            onStateChange: (event) => {
              if (event.data === 1) {
                onPlayingChange(true);
              } else if (event.data === 2 || event.data === 0) {
                onPlayingChange(false);
              }
            },
            onError: () => {
              setUseFallbackAudio(true);
              if (shouldPlayRef.current && audioRef.current) {
                audioRef.current.volume = 0.82;
                audioRef.current
                  .play()
                  .then(() => onPlayingChange(true))
                  .catch(() => onPlayingChange(false));
              }
            },
          },
        });
      };

      if (window.YT?.Player) {
        initPlayer();
      } else {
        const prevReady = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          prevReady?.();
          initPlayer();
        };

        if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
          const script = document.createElement('script');
          script.src = 'https://www.youtube.com/iframe_api';
          script.async = true;
          document.head.appendChild(script);
        }
      }

      return () => {
        cancelled = true;
      };
    }, [onPlayingChange]);

    const play = () => {
      shouldPlayRef.current = true;
      if (useFallbackAudio && audioRef.current) {
        audioRef.current.volume = 0.82;
        audioRef.current
          .play()
          .then(() => onPlayingChange(true))
          .catch(() => onPlayingChange(false));
      } else if (ytPlayerRef.current) {
        ytPlayerRef.current.unMute();
        ytPlayerRef.current.setVolume(88);
        ytPlayerRef.current.playVideo();
        onPlayingChange(true);
      } else {
        postYtCommand('unMute');
        postYtCommand('setVolume', [88]);
        postYtCommand('playVideo');
        onPlayingChange(true);
      }
    };

    const pause = () => {
      shouldPlayRef.current = false;
      if (useFallbackAudio && audioRef.current) {
        audioRef.current.pause();
        onPlayingChange(false);
      } else if (ytPlayerRef.current) {
        ytPlayerRef.current.pauseVideo();
        onPlayingChange(false);
      } else {
        postYtCommand('pauseVideo');
        onPlayingChange(false);
      }
    };

    const toggle = () => {
      if (shouldPlayRef.current) pause();
      else play();
    };

    useImperativeHandle(ref, () => ({play, pause, toggle}));

    const originParam =
      typeof window !== 'undefined' ? `&origin=${encodeURIComponent(window.location.origin)}` : '';
    const startParam =
      weddingConfig.youtubeStartSeconds > 0 ? `&start=${weddingConfig.youtubeStartSeconds}` : '';
    const embedSrc = `https://www.youtube.com/embed/${weddingConfig.youtubeVideoId}?enablejsapi=1&playsinline=1${startParam}&loop=1&playlist=${weddingConfig.youtubeVideoId}&rel=0&controls=0${originParam}`;

    return (
      <>
        <div
          aria-hidden="true"
          className="pointer-events-none fixed bottom-0 left-0 h-px w-px overflow-hidden opacity-0"
        >
          <iframe
            ref={iframeRef}
            id="yt-wedding-player"
            width="200"
            height="200"
            src={embedSrc}
            title={weddingConfig.songTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <audio ref={audioRef} src={weddingConfig.audioSrc} loop preload="none" />
      </>
    );
  }
);
