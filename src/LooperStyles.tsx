import styled from 'styled-components';
import { LooperControlStyles } from './LooperControls';

export const LooperStyles = styled.div`
  display: flex;

  * {
    flex: 1 1 auto;
  }

  ${LooperControlStyles} {
    flex: 0 0 auto;
  }
`;