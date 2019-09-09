import Base from 'components/Base/BaseRounded';

export const B1 = `
  display: flex;
  align-items: center;
  padding: 40px;

  img {
    width: 150px;
    margin: 0 50px 0 25px;
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
    img {
      display: none;
    }
  }
`;

export default Base.extend`
  ${B1};
`;
