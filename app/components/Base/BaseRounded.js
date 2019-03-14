import Base from 'components/Base';

const BaseRounded = Base.extend`
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 #00000013;
  transition: 0.5s;

  :hover {
    box-shadow: 0 5px 5px 0 #00000013;
  }
`;

export default BaseRounded;
