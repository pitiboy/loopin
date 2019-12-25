import React from 'react';
import styled from 'styled-components';

export const LooperControlStyles = styled.div`
  display: flex;
`;

export interface ControlButtonProps {
  active?: boolean;
}

export const ControlButton = styled.button<ControlButtonProps>`
  ${props => props.active && `
    background-color: green;
  `}
`;


export const LooperControls = ({ muted, setMuted, name }: { muted: boolean; setMuted: (a: boolean) => void; name?: string}) => (
  <LooperControlStyles>
    <ControlButton onClick={() => setMuted(!muted)} active={muted}>Mute</ControlButton>
  </LooperControlStyles>
);
