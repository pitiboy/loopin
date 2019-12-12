import styled from 'styled-components';

export default styled.section`
  display: flex;
  font-size: 2rem;
  font-weight: bold;
  align-items: center;
  justify-content: flex-start;

  ${props => props.title && `
    &:before {
      content: '${props.title}:';
      text-decoration: underline;
    }
  `}

  .MIDISounds {
    margin: 0px 10px;
    &>* {
      display: flex;
      align-items: center;

      &:after {
        content: 'config';
        font-size: initial;
      }
    }
    svg {
      width: 40px;
      height: 30px;
    }
  }
`;