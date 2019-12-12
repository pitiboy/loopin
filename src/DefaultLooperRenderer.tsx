import React from 'react';
import styled from 'styled-components';
import { LooperRendererProps, BeatStylesProps } from './Looper';


export const DefaultRythmStyles = styled.div`
  display: flex;
`;

export const DefaultBeatStyles = styled.div<BeatStylesProps>`
  ${props => props.active && `
    color: green;
    font-weight: bold;
  `}
`;

export default ({ playBeat, step }: LooperRendererProps) => (
  <DefaultRythmStyles>
    {(playBeat && playBeat.map((beat, index) => <DefaultBeatStyles active={index === step} key={index}>{beat}</DefaultBeatStyles>)) || null}
  </DefaultRythmStyles>
);
