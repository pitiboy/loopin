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
}

export interface LooperProps extends GetPlayBeatProps {
  bpm?: number;
  looping?: boolean;
  source?: () => void;
  rythmLength?: number; // needs to be injected
  step?: number; // needs to be injected
}

export default ({
  looping = true,
  rythmLength,
  playType = PlayTypes.odd,
  playBeat,
  source,
  step,
}: LooperProps) => {
  const getStep = step || 0;

  // TODO: refactor & test
  const generatePlayBeat = ({ playBeat, playType }: GetPlayBeatProps) => {
    if (playBeat) return playBeat
    switch (playType) {
    case PlayTypes.odd:
      return new Array(rythmLength).fill(0).map((_qwe, index) => 1 - (index % 2));
    case PlayTypes.even:
      return new Array(rythmLength).fill(0).map((_qwe, index) => index % 2);
    case PlayTypes.first:
      return new Array(rythmLength).fill(0).map((_qwe, index) => index === 0);
    case PlayTypes.last:
      return new Array(rythmLength).fill(0).map((_qwe, index) => index === 0);
    case PlayTypes.all:
    default:
      return new Array(rythmLength).fill(1);
    }
  }
  const getPlayBeat = generatePlayBeat({ playBeat, playType });
  console.log('generatePlayBeat', getPlayBeat);

  const playSource = () => {
    console.log('getPlayBeat[getStep] && source', getPlayBeat[getStep], source);
    if(getPlayBeat[getStep] && source) {
      console.log('play')
      source();
    }
  }

  useEffect(() => {
    console.log('useeffect', looping);
    if (looping) {
      console.log('useeffect playSource');
      playSource();
    }
  }, [step, looping]);

  return (
    <RythmStyles>
      {getPlayBeat.map((beat, index) => <BeatStyles active={index === getStep}>{beat}</BeatStyles>)}
    </RythmStyles>
  );
};