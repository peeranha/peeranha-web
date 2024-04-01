import { BG_SUCCESS, TEXT_LIGHT } from 'style-constants';
import { graphCommunityColors } from 'utils/communityManagement';
import Button from '../index';

const graphCommunity = graphCommunityColors();

export default Button.extend`
  background: ${graphCommunity ? '#4BCA81' : BG_SUCCESS};
  color: ${TEXT_LIGHT};
`;
