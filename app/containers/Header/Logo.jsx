import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { LEFT_MENU_WIDTH } from 'containers/AppWrapper/constants';
import { TITLE_FONT, LINK_COLOR } from 'style-constants';

import { singleCommunityStyles } from 'utils/communityManagement';

const styles = singleCommunityStyles();

const Logo = styled.div`
  display: flex;
  justify-content: left;
  width: ${LEFT_MENU_WIDTH}px;

  img {
    width: 180px;
    height: 40px;
    object-fit: contain;
    margin-top: 5px;
  }

  @media only screen and (max-width: 992px) {
    width: auto;

    img {
      width: 150px;
    }
  }
`.withComponent(Link);

const QAndALogo = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  width: ${LEFT_MENU_WIDTH}px;
  padding: 0 25.5px;

  font-family: ${TITLE_FONT};
  font-size: 24px;
  font-weight: 600;
  color: ${styles.commHeadElemColor || LINK_COLOR};

  :hover {
    color: ${styles.commHeadElemColor || LINK_COLOR};

    opacity: 0.7;
  }

  > span:nth-child(2) {
    position: absolute;
    left: 29px;
    top: -18px;

    font-size: 85px;

    opacity: 0.15;
  }

  > span:last-child {
    align-self: flex-end;
  }

  @media (max-width: 992px) {
    > span:nth-child(2) {
      top: -11px;
      font-size: 72px;
    }
  }

  @media (max-width: 450px) {
    width: 105px;
    padding: 0;

    font-size: 20px;

    > span:nth-child(2) {
      left: -5px;

      font-size: 60px;
    }
  }
`.withComponent(Link);

export { QAndALogo };
export default Logo;
