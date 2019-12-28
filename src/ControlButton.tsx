import styled from 'styled-components';

export interface ControlButtonProps {
  active?: boolean;
}

export const ControlButton = styled.button<ControlButtonProps>`
  ${props => props.active && `
    background-color: green;
  `}
`;
