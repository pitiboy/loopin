declare module 'midi-sounds-react';

interface MIDISoundsType {
  playChordNow: (a: number, b: [number], c: number) => void;
  playDrumsNow: (a: [number]) => void;
}