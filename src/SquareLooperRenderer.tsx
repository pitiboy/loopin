import React from 'react';
import styled from 'styled-components';
import { LooperRendererProps, BeatStylesProps } from './Looper';


export const RythmStyles = styled.div`
  display: flex;
`;

export const BeatStyles = styled.button<BeatStylesProps>`
  border-radius: 4px;
  border: solid 1px black;
  background: gray;
  margin: 3px;
  flex: 1 1 auto;
  height: 50px;
  overflow: hidden;
  color: #515e2d;

  ${props => !props.enabled && props.active && `
    background: #999;
  `}

  ${props => props.enabled && `
    background: #515e2d;
  `}
  ${props => props.enabled && props.active && `
    background: rgb(180,193,38);
    background: radial-gradient(circle, rgba(180,193,38,1) 35%, rgba(112,125,76,1) 100%);
  `}
`;


export default ({ playBeat, step, setPlayBeat }: LooperRendererProps) => {
  const updateBeat = (index: number) => {
    if (!setPlayBeat) return ;
    const newPlayBeat = playBeat.slice();
    newPlayBeat[index] = !newPlayBeat[index] ? 1 : 0;
    setPlayBeat(newPlayBeat)
  };
  return (
    <RythmStyles>
      {(playBeat && playBeat.map((beat, index) => <BeatStyles active={index === step} enabled={beat > 0} key={index} onClick={() => updateBeat(index)} />)) || null}
    </RythmStyles>
  );
}
