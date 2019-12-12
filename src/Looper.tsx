import React, { useEffect, useState } from 'react';
import DefaultLooperRenderer from './DefaultLooperRenderer';

export interface BeatStylesProps {
  active: boolean;
  enabled?: boolean;
}


export interface LooperRendererProps {
  playBeat: number[];
  step: number;
  setPlayBeat?: (playBeat: number[]) => void;
}

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

export interface GeneratePlayBeatProps extends BasicLooperProps {
  multiplier: number; // needs to be injected
}

export interface LooperProps extends BasicLooperProps {
  bpm?: number;
  looping?: boolean;
  source?: () => void;
  step?: number; // needs to be injected
  metronomeBpm?: number;
  render?: (props: LooperRendererProps) => JSX.Element;
  playBeat?: number[];
}


const generatePlayBeat = ({ playType, rythmLength, multiplier }: GeneratePlayBeatProps) => {
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
  playBeat: originalPlayBeat,
  source,
  step,
  render: renderProp,
}: LooperProps) => {
  const multiplier = (bpm && metronomeBpm && bpm / metronomeBpm) || 1;
  const getStep = (step || 0) * multiplier;
  const LooperRenderer = renderProp || DefaultLooperRenderer;
  const [playBeat, setPlayBeat] = useState(originalPlayBeat|| generatePlayBeat({ playType, rythmLength, multiplier }));

  const playSource = () => {
    if(playBeat[getStep] && source) {
      source();
    }
  }

  useEffect(() => {
    if (looping) {
      playSource();
    }
  }, [step, looping]);

  return (
    <LooperRenderer playBeat={playBeat} step={getStep} setPlayBeat={(playBeat) => setPlayBeat(playBeat)} />
  );
};