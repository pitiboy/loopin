import React, { useRef, useState } from 'react';
import MIDISounds from 'midi-sounds-react';
// import Looper from 'react-looper';
import Looper, { PlayTypes } from './Looper';
import './App.css';
import Metronome, { defaultBPM } from './Controls/Metronome';
import SquareLooperRenderer from './SquareLooperRenderer';
import Section from './Layout/Section';
import PianoKeyboard from './Layout/PianoKeyboard';


const App: React.FC = () => {
  const midiDrums = useRef<MIDISoundsType>(null);
  const midiBass = useRef<MIDISoundsType>(null);
  const midiKeys = useRef<MIDISoundsType>(null);
  const [bassChord, setBassChord] = useState(376); // good bass: 372, 376
  const [pianoChord, setPianoChord] = useState(847);

  // TODO: strings Keys, , Strings
  const playChord = (pitches: number | number[]) => {
    if (midiKeys !== null && midiKeys.current !== null) {
      const defaultPitches: number[] = [];
      const playPitches = defaultPitches.concat(pitches);
      midiKeys.current.playChordNow(pianoChord, playPitches, 0.5);
    }
  }

  const cacheInstrument = (instrument: number) => {
    console.log('trying to cache instrument', instrument);
    if (midiKeys.current) {
      midiKeys.current.cacheInstrument(instrument);
      midiKeys.current.player.loader.waitLoad(() => playChord(50));
    }
    setPianoChord(instrument);
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

        <Section title="Bass">
          <MIDISounds ref={midiBass} appElementName="root" instruments={[bassChord]} />
           <input type="number" value={bassChord} onChange={e => setBassChord(parseInt(e.target.value, 10))} min={366} max={446} />
        </Section>
        <Looper playType={PlayTypes.odd} bpm={myBPM * 4} source={() => midiBass.current && midiBass.current.playChordNow(bassChord, [30], 1)} render={SquareLooperRenderer} />
      </Metronome>


      <Section title="Keys">
        <MIDISounds ref={midiKeys} appElementName="root" instruments={[1,2,3,305, 847]} />
        <input type="number" value={pianoChord} onChange={e => cacheInstrument(parseInt(e.target.value, 10))}  min={0} max={1393} />
      </Section>

      <PianoKeyboard playNote={(note) => playChord(note)} />
    </div>
  );
}

export default App;
