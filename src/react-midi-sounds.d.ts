declare module 'midi-sounds-react';

interface MIDISoundsType {
  playChordNow: (instrument: number, pitches: number[], duration: number) => void;
  playDrumsNow: (drums: [number]) => void;
  cacheInstrument: (instrument: number) => void;
  player: {
    loader: {
      waitLoad: (func: () => void) => void;
    }
  }
}