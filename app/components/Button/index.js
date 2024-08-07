import styled from 'styled-components';

import { BORDER_RADIUS_M } from 'style-constants';
import { singleCommunityStyles } from 'utils/communityManagement';

const styles = singleCommunityStyles();

const Button = styled.button`
  cursor: ${(item) => (item.block ? 'not-allowed !important' : 'pointer')};
  border-radius: ${styles.buttonBorderRadius || BORDER_RADIUS_M};
  text-align: center;
  transition: 0.5s;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  position: relative;
  opacity: ${(item) => (item.block ? '0.5' : '1')};
  font-weight: 500;
`;

export default Button;
