import styled from 'styled-components';

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;

  > * {
    margin-left: 15px;
  }

  @media only screen and (max-width: 992px) {
    > * {
      margin-left: 8px;
    }
  }
`;

export default Section;
