import styled from 'styled-components';

import { BG_LIGHT, BORDER_RADIUS_L } from 'style-constants';

import IconStyled from 'components/Icon/IconStyled';
import { graphCommunityColors } from 'utils/communityManagement';

const graphCommunity = graphCommunityColors();

export default styled.div`
  position: relative;
  width: 400px;
  max-height: 86vh;
  z-index: 500;
  animation: moveFromTopToCenter 0.5s;
  overflow: auto;

  ${IconStyled} {
    cursor: pointer;
    margin-bottom: 5px;
  }

  > div.modal-children {
    position: relative;
    background: ${graphCommunity ? '#161425' : BG_LIGHT};
    border-radius: ${BORDER_RADIUS_L};
    transition: 1s;
    padding: 30px;
    overflow: hidden;
  }

  @media only screen and (max-width: 414px) {
    width: calc(100vw - 40px);
    margin: 0 20px;

    > div.modal-children {
      padding: 20px;
    }
  }

  @media only screen and (max-width: 360px) {
    width: calc(100vw - 20px);
    margin: 0 10px;
  }

  @keyframes moveFromTopToCenter {
    from {
      top: -450px;
    }
    to {
      top: 0px;
    }
  }
`;
