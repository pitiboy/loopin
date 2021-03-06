import styled from 'styled-components';

export const LooperControlStyles = styled.div`
  display: flex;
`;

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

  * {
    flex: 0 0 auto;
    max-width: 100px;
  }
`;


export default LooperStyles;
