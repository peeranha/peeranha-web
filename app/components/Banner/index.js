import Base from 'components/Base/BaseRounded';

export const B1 = `
  display: flex;
  align-items: center;
  padding: 40px;

  img {
    min-height: 140px;
    object-fit: contain;
    margin: 0 50px 0 25px;
    box-sizing: content-box;
  }

  div {
    p:nth-child(1) {
      margin-bottom: 5px;
      font-size: 24px;
      font-weight: 600;
    }

    p {
      line-height: 24px;
    }

    button {
      margin-top: 20px;
    }
  }

  @media only screen and (max-width: 576px) {
    flex-direction: column;

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
