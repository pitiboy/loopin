import React, { useRef } from 'react';
import MIDISounds from 'midi-sounds-react';
// import Looper from 'react-looper';
import Looper, { PlayTypes } from './Looper';
import './App.css';
import Metronome, { defaultBPM } from './Metronome';
import SquareLooperRenderer from './SquareLooperRenderer';

const App: React.FC = () => {
  const midiSounds = useRef<MIDISoundsType>(null);
  const drum = useRef<MIDISoundsType>(null);
  const drum2 = useRef<MIDISoundsType>(null);
  const playPiano = () => {
    if (midiSounds !== null && midiSounds.current !== null) {
      midiSounds.current.playChordNow(1, [41], 1);
    }
  }
  const myBPM = 80;
  return (
    <div className="App">
      <button onClick={() => playPiano()}>Play</button>
      <Metronome bpm={myBPM}>
        <Looper playType={PlayTypes.oddQuarter} bpm={myBPM * 2} source={() => drum2.current && drum2.current.playDrumsNow([1])} render={SquareLooperRenderer} />
        <Looper playBeat={[0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1]} bpm={myBPM * 2} source={() => drum2.current && drum2.current.playDrumsNow([1])} render={SquareLooperRenderer} />
        <Looper playType={PlayTypes.even} source={() => drum.current && drum.current.playDrumsNow([16])} render={SquareLooperRenderer} />
        <Looper playType={PlayTypes.even} bpm={myBPM * 4} source={() => drum.current && drum.current.playDrumsNow([39])} render={SquareLooperRenderer} />
      </Metronome>
      {/* <Looper looping playEach={2} oscillator={{ frequency: 300, duration: 0.5 }} /> */}

      <MIDISounds ref={midiSounds} appElementName="root" instruments={[3]} />
      <MIDISounds ref={drum} appElementName="root" drums={[39]} />
      <MIDISounds ref={drum} appElementName="root" drums={[16]} />
      <MIDISounds ref={drum2} appElementName="root" drums={[1]} />
    </div>
  );
}

export default App;
