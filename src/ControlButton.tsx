import styled from 'styled-components';

// TODO: xstate

export interface ControlButtonProps {
  active?: boolean;
}

export const ControlButton = styled.button<ControlButtonProps>`
  background-color: lightgray;
  border: solid 1px gray;
  border-radius: 4px;

  ${props => props.active && `
    background-color: green;
  `}
`;
