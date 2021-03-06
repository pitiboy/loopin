import React, { useRef, useState, useContext } from 'react';
import { observer } from 'mobx-react';
import MIDISounds from 'midi-sounds-react';
// import Looper from 'react-looper';
import Looper from './Looper';
import './App.css';
import Metronome from './Controls/Metronome';
import SquareLooperRenderer from './SquareLooperRenderer';
import Section from './Layout/Section';
import PianoKeyboard from './Layout/PianoKeyboard';
import RootControls from './Controls/RootControls';
import StoreContext from './model/stores';
import MicRecorder from './Controls/MicRecorder';
import MultipleInstrumentSelector from './Controls/Music/MultipleInstrumentSelector';


const App: React.FC = observer(() => {
  const midiDrums = useRef<MIDISoundsType>(null);
  const midiBass = useRef<MIDISoundsType>(null);
  const midiKeys = useRef<MIDISoundsType>(null);
  const [pianoChord, setPianoChord] = useState(847);
  const [myBPM, setMyBPM] = useState(80);
  const { trx } = useContext(StoreContext);

  // TODO: strings Keys, , Strings
  const playChord = (pitches: number | number[]) => {
    if (midiKeys !== null && midiKeys.current !== null) {
      const defaultPitches: number[] = [];
      const playPitches = defaultPitches.concat(pitches);
      midiKeys.current.playChordNow(pianoChord, playPitches, 0.5);
    }
  };

  const cacheInstrument = (instrument: number) => {
    console.log('trying to cache instrument', instrument);
    if (midiKeys.current) {
      midiKeys.current.cacheInstrument(instrument);
      midiKeys.current.player.loader.waitLoad(() => playChord(50));
    }
    setPianoChord(instrument);
  };
  console.log('midiDrums.current loaded', midiDrums.current);
  // TODO: function call for MultipleInstrumentSelector;
  return (
    <div className="App">
      set BPM: <input type="number" value={myBPM} onChange={e => setMyBPM(parseInt(e.target.value, 10))} min={30} max={300} />
      <RootControls />
      <Metronome bpm={myBPM}>
        <Section title="Drums">
          <MIDISounds ref={midiDrums} appElementName="root" drums={trx.drumInstrumentIds} />
        </Section>
        {trx.drums.map(drum => (
          <Looper {...drum} key={drum.name} bpm={myBPM * drum.divider} source={({ instruments }) => (midiDrums.current ? midiDrums.current.playDrumsNow(instruments) : console.warn('MIDI not ready'))} render={SquareLooperRenderer}>
            {midiDrums.current && <MultipleInstrumentSelector midiSounds={midiDrums.current} instrument={drum.typeConfig.instruments[0]} />}
          </Looper>
        ))}

        <Section title="Bass">
          <MIDISounds ref={midiBass} appElementName="root" instruments={trx.bassersInstrumentIds} />
          {/* <input type="number" value={bassChord} onChange={e => setBassChord(parseInt(e.target.value, 10))} min={366} max={446} /> */}
        </Section>
        {trx.bassers.map(chord => <Looper {...chord} key={chord.name} bpm={myBPM * chord.divider} source={({ instrument, pitches, duration }) => (midiBass.current ? midiBass.current.playChordNow(instrument, pitches, duration) : console.warn('MIDI2 not ready'))} render={SquareLooperRenderer} />)}

        <Section title="Voice">
          <MicRecorder />
        </Section>
        {trx.recordings.map(chord => <Looper {...chord} key={chord.name} bpm={myBPM * chord.divider} render={SquareLooperRenderer}><audio id={chord.name} controls src={chord.typeConfig.blobUrl} /></Looper>)}
      </Metronome>


      <Section title="Keys">
        <MIDISounds ref={midiKeys} appElementName="root" instruments={[1, 2, 3, 305, 847]} />
        <input type="number" value={pianoChord} onChange={e => cacheInstrument(parseInt(e.target.value, 10))} min={0} max={1393} />
      </Section>

      <PianoKeyboard playNote={(note) => playChord(note)} />
    </div>
  );
});

export default App;
