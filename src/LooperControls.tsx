import React from 'react';
import { LooperControlStyles, Name } from './LooperStyles';
import { ControlButton } from './ControlButton';
import { TrackControlProps, TrackTypeProps } from './model/stores/TrackStore';

export interface LooperControlProps extends TrackControlProps, TrackTypeProps {
  setMuted: (a: boolean) => void;
  children?: JSX.Element | null;
}

export const DefaultLooperControl = ({
  name, muted, setMuted, children,
}: LooperControlProps) => (
  <LooperControlStyles>
    <Name>
      {name}
      {/* TODO: https://github.com/surikov/midi-sounds-react-examples/blob/master/examples/midi-sounds-example4/src/App.js */}
      {children}
    </Name>
    <ControlButton onClick={() => setMuted(!muted)} active={muted}>Mute</ControlButton>
  </LooperControlStyles>
);
