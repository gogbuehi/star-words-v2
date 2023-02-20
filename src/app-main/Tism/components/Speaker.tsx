import {useEffect, useRef, useState} from "react";
interface AudioPlayerProps {
  source: string;
  onEnded?: () => void;
}
const Speaker = ({ source, onEnded }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    const audioEl = audioRef.current;
    if (audioEl instanceof HTMLAudioElement) {
      if (isPlaying) {
        audioEl.pause();
      } else {
        audioEl.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = (): void => {
    setIsPlaying(false);

    if (onEnded) {
      onEnded();
    }
  }

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement instanceof HTMLAudioElement) {
      audioElement.play();
      setIsPlaying(true);
    }

    return () => {
      if (audioElement instanceof HTMLAudioElement) {
        audioElement.pause();
        setIsPlaying(false);
      }
    };
  }, [source]);

  return (
    <div>
      <audio src={`/audio/numbers/${source}.mp3`} ref={audioRef} onEnded={handleEnded} />
      {/*<button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>*/}
      <div>{source}</div>
    </div>
  );
}

export default Speaker;
