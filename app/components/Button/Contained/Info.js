import { TEXT_LIGHT, BUTTON_COLOR } from 'style-constants';
import { graphCommunityColors } from 'utils/communityManagement';

import Button from '../index';
const graphCommunity = graphCommunityColors();

export default Button.extend`
  background: ${BUTTON_COLOR};
  color: ${TEXT_LIGHT};
  :hover {
    opacity: ${graphCommunity ? 1 : 0.8};
  }
`;
