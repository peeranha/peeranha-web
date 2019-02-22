import styled from 'styled-components';

/* istanbul ignore next */
const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props =>
    props.isMenuVisible ? 'flex-start' : 'flex-end'};
  flex: 1;

  > * {
    margin-left: 10px;
  }
`;

export default Section;
