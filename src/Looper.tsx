import React, { useEffect, useState } from 'react';
import DefaultLooperRenderer from './DefaultLooperRenderer';
import { LooperControls } from './LooperControls';
import LooperStyles, { Name } from './LooperStyles';
import { PlayBeatType, PlayTypes } from './model/types';

export interface BeatStylesProps {
  active: boolean;
  enabled?: boolean;
}


export interface LooperRendererProps {
  playBeat: PlayBeatType;
  step: number;
  setPlayBeat?: (playBeat: PlayBeatType) => void;
}


export interface BasicLooperProps {
  playType?: PlayTypes;
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
  playBeat?: PlayBeatType;
  name?: string;
}


// TODO: test
const generatePlayBeat = ({ playType, rythmLength, multiplier }: GeneratePlayBeatProps) => {
  const length = (rythmLength || 0) * multiplier;
  switch (playType) {
  case PlayTypes.odd:
    return new Array(length).fill(0).map((_qwe, index) => 1 - (index % 2));
  case PlayTypes.even:
    return new Array(length).fill(0).map((_qwe, index) => index % 2);
  case PlayTypes.oddQuarter:
    return new Array(length).fill(0).map((_qwe, index) => (index % 4 ? 0 : 1));
  case PlayTypes.evenQuarter:
    return new Array(length).fill(0).map((_qwe, index) => (index % 4 === 2 ? 1 : 0));
  case PlayTypes.first:
    return new Array(length).fill(0).map((_qwe, index) => index === 0);
  case PlayTypes.last:
    return new Array(length).fill(0).map((_qwe, index) => index === 0);
  case PlayTypes.all:
  default:
    return new Array(length).fill(1);
  }
};


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
  name,
}: LooperProps) => {
  const multiplier = (bpm && metronomeBpm && bpm / metronomeBpm) || 1;
  const getStep = (step || 0) * multiplier;
  const LooperRenderer = renderProp || DefaultLooperRenderer;
  const [playBeat, setPlayBeat] = useState((originalPlayBeat && originalPlayBeat.slice())|| generatePlayBeat({ playType, rythmLength, multiplier }));
  const [muted, setMuted] = useState(false);

  const playSource = () => {
    if (playBeat[getStep] && source && !muted) {
      source();
    }
  };


  useEffect(() => {
    if (looping) {
      playSource();
    }
  }, [step, looping]);

  return (
    <LooperStyles>
      <Name>{name}</Name>
      <LooperControls muted={muted} setMuted={setMuted} />
      <LooperRenderer playBeat={playBeat} step={getStep} setPlayBeat={(thisPlayBeat) => setPlayBeat(thisPlayBeat)} />
    </LooperStyles>
  );
};
