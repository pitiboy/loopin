import React from 'react';
import styled from 'styled-components';
import { ControlButton } from './ControlButton';

export const LooperControlStyles = styled.div`
  display: flex;
`;

export const LooperControls = ({ muted, setMuted }: { muted: boolean; setMuted: (a: boolean) => void; name?: string}) => (
  <LooperControlStyles>
    <ControlButton onClick={() => setMuted(!muted)} active={muted}>Mute</ControlButton>
  </LooperControlStyles>
);
