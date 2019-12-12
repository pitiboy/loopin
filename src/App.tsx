import React, { useRef } from 'react';
import MIDISounds from 'midi-sounds-react';
// import Looper from 'react-looper';
import Looper, { PlayTypes } from './Looper';
import './App.css';
import Metronome, { defaultBPM } from './Metronome';
import SquareLooperRenderer from './SquareLooperRenderer';
import Section from './Layout/Section';
import PianoKeyboard from './Layout/PianoKeyboard';


const App: React.FC = () => {
  const midiKeys = useRef<MIDISoundsType>(null);
  const midiDrums = useRef<MIDISoundsType>(null);
  const midiBass = useRef<MIDISoundsType>(null);
  // TODO: strings Keys, , Strings
  const playChord = (pitches: number | number[]) => {
    if (midiDrums !== null && midiDrums.current !== null) {
      const defaultPitches: number[] = [];
      const playPitches = defaultPitches.concat(pitches);
      midiDrums.current.playChordNow(847, playPitches, 1);
    }
  }
  const myBPM = 80;
  return (
    <div className="App">
      <Metronome bpm={myBPM}>
        <Section title="Drums">
          <MIDISounds ref={midiDrums} appElementName="root" drums={[1, 16, 39]} />
        </Section>
        <Looper playType={PlayTypes.oddQuarter} bpm={myBPM * 2} source={() => midiDrums.current && midiDrums.current.playDrumsNow([1])} render={SquareLooperRenderer} />
        <Looper playBeat={[0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1]} bpm={myBPM * 2} source={() => midiDrums.current && midiDrums.current.playDrumsNow([1])} render={SquareLooperRenderer} />
        <Looper playType={PlayTypes.even} source={() => midiDrums.current && midiDrums.current.playDrumsNow([16])} render={SquareLooperRenderer} />
        <Looper playType={PlayTypes.even} bpm={myBPM * 4} source={() => midiDrums.current && midiDrums.current.playDrumsNow([39])} render={SquareLooperRenderer} />

        <Looper playType={PlayTypes.odd} bpm={myBPM * 4} source={() => midiBass.current && midiBass.current.playChordNow(376, [30], 1)} render={SquareLooperRenderer} />
      </Metronome>

      <Section title="Bass">
        <MIDISounds ref={midiBass} appElementName="root" instruments={[376]} />
      </Section>

      <Section title="Keys">
        <MIDISounds ref={midiKeys} appElementName="root" instruments={[1,2,3,305, 847]} />
      </Section>

      <PianoKeyboard playNote={(note) => playChord(note)} />
    </div>
  );
}

export default App;
