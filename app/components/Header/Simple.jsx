import BaseRounded from 'components/Base/BaseRounded';

const C1 = `
  flex-direction: column;
  align-items: flex-start;

  > div:nth-child(2) {
    width: 100%;
    margin-top: 15px;
  }
`;

const C2 = `
  flex-direction: row;

  .right-panel button {
    img {
      margin-right: 0 !important;
    }
  }

  @media only screen and (max-width: 690px) {
    flex-wrap: wrap;

    > div:nth-child(2) {
      width: 100%;
      margin-top: 15px;
    }
  }
`;

export const C3 = isColumnForSM => `
  display: flex;
  align-items: center;
  justify-content: space-between;

  .right-panel {
    button {
      display: flex;
      align-items: center;
    }
  }

  @media only screen and (max-width: 576px) {
    background: none;
    box-shadow: none;

    h3 {
      font-size: 24px;
      line-height: 1;

      img {
        margin-right: 8px;
      }
    }

    .right-panel {
      margin-left: 12px !important;

      button {
        padding: 5px;
      }
    }

    ${isColumnForSM ? C1 : C2};
  }
`;

export default BaseRounded.extend`
  ${({ isColumnForSM }) => C3(isColumnForSM)};
  flex-direction: row;

  @media only screen and (max-width: 576px) {
    flex-direction: ${({ single }) => (single ? 'column' : 'row')};
    align-items: ${({ single }) => (single ? 'flex-start' : 'center')};
    &:nth-child(2) {
      justify-items: flex-start;
    }
  }
`;
