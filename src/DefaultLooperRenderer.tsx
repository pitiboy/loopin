import React from 'react';
import styled from 'styled-components';
import { RythmConfigTypes } from './model/types';


export interface BeatStylesProps {
  active: boolean;
  enabled?: boolean;
}


export interface LooperRendererProps {
  rythmConfig: RythmConfigTypes;
  step: number;
  setPlayBeat?: (rythmConfig: RythmConfigTypes) => void;
}


export const DefaultRythmStyles = styled.div`
  display: flex;
`;

export const DefaultBeatStyles = styled.div<BeatStylesProps>`
  ${props => props.active && `
    color: green;
    font-weight: bold;
  `}
`;

export default ({ rythmConfig, step }: LooperRendererProps) => (
  <DefaultRythmStyles>
    {(rythmConfig && rythmConfig.map((beat, index) => <DefaultBeatStyles active={index === step} key={index}>{beat}</DefaultBeatStyles>)) || null}
  </DefaultRythmStyles>
);
