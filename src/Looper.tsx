import React, { useEffect, useState, useContext } from 'react';
import DefaultLooperRenderer, { LooperRendererProps } from './DefaultLooperRenderer';
import { LooperControlProps, DefaultLooperControl } from './LooperControls';
import LooperStyles from './LooperStyles';
import { PlayTypes, TrackType } from './model/types';
import {
  MidiSoundConfigProps, PitchedMidiSoundConfigProps, TrackProps, InitialRythmConfigProps, AudioSoundConfigProps,
} from './model/stores/TrackStore';
import StoreContext from './model/stores';

export interface MetronomeConfigProps {
  rythmLength?: number; // needs to be injected
}
export interface MetronomeStatusProps {
  // coming from metronome
  metronomeBpm?: number;
  step?: number; // needs to be injected
}

export interface MetronomeProps extends MetronomeConfigProps, MetronomeStatusProps {

}

export interface GeneratePlayBeatProps extends MetronomeConfigProps, InitialRythmConfigProps {
  multiplier: number; // needs to be injected
}

export interface LooperProps extends MetronomeProps, InitialRythmConfigProps, TrackProps {
  // own props
  bpm?: number;
  looping?: boolean;
  render?: (props: LooperRendererProps) => JSX.Element;
  control?: (props: LooperControlProps) => JSX.Element;
  children?: JSX.Element;
  // TODO???: refactor similar as playSound?
  source?: (...args: any) => void;
}


// TODO: test
const generatePlayBeat = ({ playType, rythmLength, multiplier }: GeneratePlayBeatProps): number[] => {
  const length = (rythmLength || 0) * multiplier;
  // console.log('generatePlayBeat', playType, length, '(', rythmLength, ' || 0) * ', multiplier);
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
    return new Array(length).fill(0).map((_qwe, index) => (index === 0 ? 1 : 0));
  case PlayTypes.last:
    return new Array(length).fill(0).map((_qwe, index) => (index === length - 1 ? 1 : 0));
  case PlayTypes.all:
  default:
    return new Array(length).fill(1);
  }
};


export default ({
  metronomeBpm,
  step,
  rythmLength,

  bpm,
  looping = true,
  render: renderProp,
  control: controlProp,
  children,

  source, // TODO??? should not be used

  name,
  muted,
  type,
  playType = PlayTypes.odd,
  rythmConfig: originalPlayBeat,
  typeConfig,
}: LooperProps) => {
  const multiplier = (bpm && metronomeBpm && bpm / metronomeBpm) || 1;
  const getStep = (step || 0) * multiplier;
  const { trx } = useContext(StoreContext);
  const LooperRenderer = renderProp || DefaultLooperRenderer;
  const ControlRenderer = controlProp || DefaultLooperControl;
  const [rythmConfig, setPlayBeat] = useState((originalPlayBeat && originalPlayBeat.slice())|| generatePlayBeat({ playType, rythmLength, multiplier }));
  const setMuted = () => trx.mute({ name, muted: !muted });

  const playSource = () => {
    if (rythmConfig[getStep] && !muted) {
      // TODO: refactor this logic outside to an other function!
      if (type === TrackType.recording && (typeConfig as AudioSoundConfigProps).playSound) (typeConfig as AudioSoundConfigProps).playSound();
      if (source && type === TrackType.drum) source(typeConfig as MidiSoundConfigProps);
      if (source && type === TrackType.bass) {
        source({
          ...typeConfig as PitchedMidiSoundConfigProps,
          pitches: (typeConfig as PitchedMidiSoundConfigProps).pitches || [rythmConfig[getStep]] || [30],
          duration: (typeConfig as PitchedMidiSoundConfigProps).duration || 1,
        });
      }
    }
  };


  useEffect(() => {
    if (looping) {
      playSource();
    }
  }, [step, looping]);

  return (
    <LooperStyles>
      <ControlRenderer muted={!!muted} setMuted={setMuted} name={name}>{children}</ControlRenderer>
      <LooperRenderer rythmConfig={rythmConfig} step={getStep} setPlayBeat={(thisPlayBeat) => setPlayBeat(thisPlayBeat)} />
    </LooperStyles>
  );
};
