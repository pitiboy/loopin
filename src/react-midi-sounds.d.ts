declare module 'midi-sounds-react';

interface MIDISoundsType {
  playChordNow: (instrument: number, pitches: number[], duration: number) => void;
  playDrumsNow: (drums: [number]) => void;
}