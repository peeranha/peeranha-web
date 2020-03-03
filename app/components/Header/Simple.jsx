import BaseRounded from 'components/Base/BaseRounded';

const C1 = `
  flex-direction: column;
  align-items: flex-start;

  > div:nth-child(2) {
    margin-top: 15px;
    margin-left: 5px;
  }
`;

const C2 = `
  flex-direction: row;

  .right-panel button {
    img {
      margin-right: 0 !important;
    }

    span {
      display: none;
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

    > *:nth-child(1) {
      margin-right: 20px;
    }

    h3 {
      font-size: 28px;
      line-height: 28px;

      img {
        margin-right: 8px;
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
