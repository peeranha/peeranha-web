import styled from 'styled-components';

import { BORDER_RADIUS_M } from 'style-constants';
import { singleCommunityStyles } from 'utils/communityManagement';

const styles = singleCommunityStyles();

const Button = styled.button`
  cursor: ${x => (x.disabled ? 'not-allowed;' : 'pointer')};
  border-radius: ${styles.buttonBorderRadius || BORDER_RADIUS_M};
  text-align: center;
  transition: 0.5s;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  position: relative;
  opacity: ${x => (x.disabled ? '0.5' : '1')};
`;

export default Button;
