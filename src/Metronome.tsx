import React, { useEffect, useState } from 'react';

export interface LooperProps {
  bpm?: number;
  looping?: boolean;
  source?: () => void;
  rythmLength?: number;
  rythmDevider?: number;
  children: JSX.Element | JSX.Element[];
}

const defaultRrythmLength = 8;
// TODO: half & quarter rythm support
export const defaultBPM = 60;

export default ({
  bpm = defaultBPM,
  looping = true,
  rythmLength = defaultRrythmLength,
  rythmDevider = 8,
  children,
}: LooperProps) => {
  const [start, setStart] = useState(new Date());
  const [step, setStep] = useState(0.0);
  const [metronome, setMetronome] = useState<number>(); // NodeJS.Timeout
  const interval = 60 / bpm * 1000; // we want to have /2, /4, /8 support

  const init = () => {
    setStart(new Date());
  }

  const calculateStep = () => {
    const diff = (new Date().getTime() - start.getTime()) / interval;
    const newStep = Math.floor(diff) % rythmLength;
    const divider = Math.floor((diff - Math.floor(diff)) * rythmLength) / 8;
    // console.log('step + divider', step, newStep + divider);
    setStep(newStep + divider);
  }

  useEffect(() => {
    if (looping) {
      init();
      // TODO: refactor metronome to global
      if (metronome) clearTimeout(metronome);
      // console.log('interval / rythmDevider', interval / rythmDevider);
      setMetronome(setInterval(() => calculateStep(), interval / rythmDevider));
    }
  }, [interval, looping]);

  const newChildren = React.Children.map(children, child => React.cloneElement(child, {
    metronomeBpm: bpm,
    step: step,
    rythmLength,
  }));

  return (
    <>
      {newChildren}
    </>
  );
};