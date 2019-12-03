import React, { useRef } from 'react';
import MIDISounds from 'midi-sounds-react';
// import Looper from 'react-looper';
import Looper, { PlayTypes } from './Looper';
import './App.css';
import Metronome from './Metronome';

const App: React.FC = () => {
  const midiSounds = useRef<MIDISoundsType>(null);
  const drum = useRef<MIDISoundsType>(null);
  const drum2 = useRef<MIDISoundsType>(null);
  const playPiano = () => {
    if (midiSounds !== null && midiSounds.current !== null) {
      midiSounds.current.playChordNow(3, [41], 2.5);
    }
  }
  const What = ({step}:{ step?: number }) => {
    return <div>step: {step}</div>;
  }
  return (
    <div className="App">
      <button onClick={() => playPiano()}>Play</button>
      <Metronome>
        <What />
        <What />
        <Looper playType={PlayTypes.odd} source={() => drum2.current && drum2.current.playDrumsNow([1])} />
        <Looper playType={PlayTypes.even} source={() => drum.current && drum.current.playDrumsNow([16])} />
        <Looper playType={PlayTypes.even} bpm={240} source={() => drum.current && drum.current.playDrumsNow([39])} />
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
