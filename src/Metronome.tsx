import React, { useEffect, useState } from 'react';

export interface LooperProps {
  bpm?: number;
  looping?: boolean;
  source?: () => void;
  rythmLength?: number;
  children: JSX.Element | JSX.Element[];
}

const defaultRrythmLength = 8;
// TODO: half & quarter rythm support
const defaultBPM = 60;

export default ({
  bpm = defaultBPM,
  looping = true,
  rythmLength = defaultRrythmLength,
  children,
}: LooperProps) => {
  const [start, setStart] = useState(new Date());
  const [step, setStep] = useState(0);
  const [metronome, setMetronome] = useState<number>(); // NodeJS.Timeout
  const interval = 60 / bpm * 1000;

  const init = () => {
    setStart(new Date());
  }

  const calculateStep = () => {
    const step = Math.floor((new Date().getTime() - start.getTime()) / interval) % rythmLength;
    // console.log('calculateStep', step);
    setStep(step);
  }

  useEffect(() => {
    if (looping) {
      init();
      // TODO: refactor metronome to global
      if (metronome) clearTimeout(metronome);
      setMetronome(setInterval(() => calculateStep(), interval));
    }
  }, [interval, looping]);

  const newChildren = React.Children.map(children, child => React.cloneElement(child, {
    step,
    rythmLength,
  }))

  return (
    <>
      {newChildren.map((Child, key) => Child)}
    </>
  );
};