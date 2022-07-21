import Base from 'components/Base/BaseRounded';

export const B1 = `
  display: flex;
  align-items: center;
  height: 253px;

  img {
    margin: 0px 100px 0px 57px;
    flex-shrink: 0;
  }

  div {
    p:nth-child(1) {
      font-size: 24px;
      line-height: 31px;
      font-weight: 600;
    }

    p {
      font-size: 16px;
      line-height: 24px;
    }

    button {
      margin-top: 20px;
    }
  }

  @media only screen and (max-width: 620px) {
    flex-direction: column;
    height: auto;

    img {
      width: 120px;
      height: 120px;
      min-height: auto;
      margin: 0;
      margin-bottom: 25px;
    }
  }
`;

export default Base.extend`
  ${B1};
`;
