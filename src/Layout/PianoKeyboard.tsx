import React from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';

export interface PianoKeyboardProps {
  playNote: (number: number) => void;
}

export default ({ playNote }: PianoKeyboardProps) => {
  const firstNote = MidiNumbers.fromNote('c3');
  const lastNote = MidiNumbers.fromNote('f5');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  return (
    <Piano
      noteRange={{ first: firstNote, last: lastNote }}
      playNote={playNote}
      stopNote={(midiNumber: number) => {
        // console.log('stop midiNumber', midiNumber);
      }}
      width={document.body.clientWidth}
      keyboardShortcuts={keyboardShortcuts}
    />
  );
}