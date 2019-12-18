import React from 'react';
import styled from 'styled-components';

export const LooperControlStyles = styled.div`
  display: flex;
`;

export interface ControlButtonProps {
  active?: boolean;
}

export const ControlButton = styled.button<ControlButtonProps>`
  ${props => props.active && `
    background-color: green;
  `}
`;


export const LooperControls = ({ muted, setMuted}: { muted: boolean, setMuted: (a: boolean ) => void}) => (
  <LooperControlStyles>
    <ControlButton onClick={() => setMuted(!muted)} active={muted}>Mute</ControlButton>
  </LooperControlStyles>
);
