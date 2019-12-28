import styled from 'styled-components';
import { LooperControlStyles } from './LooperControls';

const LooperStyles = styled.div`
  display: flex;

  * {
    flex: 1 1 auto;
  }

  ${LooperControlStyles} {
    flex: 0 0 auto;
  }
`;

export const Name = styled.b`
  flex: 0 0 auto;
  width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default LooperStyles;
