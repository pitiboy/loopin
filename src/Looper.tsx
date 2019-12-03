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

export enum PlayTypes {
  all = "all",
  odd = "odd",
  even = "even",
  first = "first",
  last = "last",
}

export interface GetPlayBeatProps {
  playType?: PlayTypes,
  playBeat?: number[],
  bpm?: number;
  metronomeBpm?: number;
}

export interface LooperProps extends GetPlayBeatProps {
  bpm?: number;
  looping?: boolean;
  source?: () => void;
  rythmLength?: number; // needs to be injected
  step?: number; // needs to be injected
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
  console.log('getStep', getStep);

  // TODO: refactor & test
  const generatePlayBeat = ({ playBeat, playType, bpm, metronomeBpm }: GetPlayBeatProps) => {
    if (playBeat) return playBeat;
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
  const getPlayBeat = generatePlayBeat({ playBeat, playType, bpm, metronomeBpm });

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
    <RythmStyles>
      {getPlayBeat.map((beat, index) => <BeatStyles active={index === getStep} key={index}>{beat}</BeatStyles>)}
    </RythmStyles>
  );
};