import styled from 'styled-components';
import _get from 'lodash/get';

import { BG_LIGHT } from 'style-constants';

import { singleCommunityStyles } from 'utils/communityManagement';

import IconStyled from 'components/Icon/IconStyled';

const styles = singleCommunityStyles();

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
    background: ${BG_LIGHT};
    border-radius: ${_get(styles, 'buttonsBorderRadius', '5px')};
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
