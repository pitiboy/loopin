import React, { useState } from 'react';
// import { PitchedMidiSoundConfigProps } from '../../model/stores/TrackStore';

interface InstrumentSelectorProps {
// interface InstrumentSelectorProps extends PitchedMidiSoundConfigProps {
  instrument: number;
  midiSounds: MIDISoundsType | null;
}

// TODO: refactor
const InstrumentSelector = ({ midiSounds, instrument: initialInstrument }: InstrumentSelectorProps) => {
  const [instrument, setInstrument] = useState(initialInstrument);

  // TODO: cache <option>s for all!
  console.log('midiSounds', midiSounds, instrument);
  return (
    <select value={instrument} onChange={e => setInstrument(parseInt(e.target.value, 10))}>
      {midiSounds && midiSounds.player.loader.drumKeys().map((title, i) => (
        <option key={i} value={i}>{`${i + 0}. ${midiSounds.player.loader.drumInfo(i).title}`}</option>
      ))}
    </select>
  );
};

export default InstrumentSelector;
