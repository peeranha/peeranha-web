import { css } from 'styled-components';
import Base from 'components/Base';

const S = css`
  display: flex;
  flex-direction: row;
  align-items: start;
  word-break: break-word;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }

  > *:nth-child(1) {
    display: flex;
    justify-content: flex-start;
    align-items: start;
    flex: 0 0 150px;

    @media only screen and (max-width: 768px) {
      flex: 0 0 100%;
      max-width: 100%;
      align-self: center;
      margin-bottom: 20px;
    }
  }

  > *:nth-child(2) {
    flex: 0 0 calc(100% - 150px);
    max-width: calc(100% - 150px);

    @media only screen and (max-width: 768px) {
      flex: 0 0 100%;
      max-width: 100%;
      align-self: stretch;
    }
  }
`;

export const ExtendedBase = Base.extend`
  ${S};
  padding: 30px;
`;

export default Base.extend`
  ${S};
`;
