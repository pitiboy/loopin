import React, { useEffect } from 'react';
import styled from 'styled-components';

interface BeatStylesProps {
  active: boolean;
}

const RythmStyles = styled.div`
  display: flex;
`;

const BeatStyles = styled.div<BeatStylesProps>`
  ${props => props.active && `
    color: green;
    font-weight: bold;
  `}
`;


export interface PlayBeatProps {
  playBeat?: number[];
}

export interface LooperRendererProps extends PlayBeatProps{
  playBeat?: number[];
  step: number;
}

const DefaultLooperRenderer = ({ playBeat, step }: LooperRendererProps) => (
  <RythmStyles>
    {(playBeat && playBeat.map((beat, index) => <BeatStyles active={index === step} key={index}>{beat}</BeatStyles>)) || null}
  </RythmStyles>
);

export enum PlayTypes {
  all = "all",
  odd = "odd",
  even = "even",
  first = "first",
  last = "last",
}



export interface BasicLooperProps {
  playType?: PlayTypes,
  rythmLength?: number; // needs to be injected
}

export interface GetPlayBeatProps extends BasicLooperProps {
  multiplier: number; // needs to be injected
}

export interface LooperProps extends BasicLooperProps, PlayBeatProps {
  bpm?: number;
  looping?: boolean;
  source?: () => void;
  step?: number; // needs to be injected
  metronomeBpm?: number;
}

const generatePlayBeat = ({ playType, rythmLength, multiplier }: GetPlayBeatProps) => {
  const length = (rythmLength || 0) * multiplier;
  switch (playType) {
  case PlayTypes.odd:
    return new Array(length).fill(0).map((_qwe, index) => 1 - (index % 2));
  case PlayTypes.even:
    return new Array(length).fill(0).map((_qwe, index) => index % 2);
  case PlayTypes.first:
    return new Array(length).fill(0).map((_qwe, index) => index === 0);
  case PlayTypes.last:
    return new Array(length).fill(0).map((_qwe, index) => index === 0);
  case PlayTypes.all:
  default:
    return new Array(length).fill(1);
  }
}

export default ({
  bpm,
  metronomeBpm,
  looping = true,
  rythmLength,
  playType = PlayTypes.odd,
  playBeat,
  source,
  step,
}: LooperProps) => {
  const multiplier = (bpm && metronomeBpm && bpm / metronomeBpm) || 1;
  const getStep = (step || 0) * multiplier;

  const getPlayBeat = playBeat || generatePlayBeat({ playType, rythmLength, multiplier });

  const playSource = () => {
    if(getPlayBeat[getStep] && source) {
      // console.log('getPlayBeat[getStep]', getStep, getPlayBeat[getStep]);
      source();
    }
  }

  useEffect(() => {
    if (looping) {
      playSource();
    }
  }, [step, looping]);

  return (
    <DefaultLooperRenderer playBeat={getPlayBeat} step={getStep} />
  );
};