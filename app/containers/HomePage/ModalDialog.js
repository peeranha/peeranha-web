import styled from 'styled-components';
import { LANDING_FONT, TEXT_SECONDARY } from 'style-constants';
import IconStyled, { IconHover } from 'components/Icon/IconStyled';

export default styled.div`
  max-width: 480px;
  min-height: 280px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 50px 20px 10px 20px;

  * {
    font-family: ${LANDING_FONT};
    font-size: 18px;
  }

  .close-icon {
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 15px 5px;

    ${IconStyled} {
      ${IconHover({ color: TEXT_SECONDARY })};

      width: 18px;
    }
  }

  .modal-dialog-message {
    text-align: left;
    font-size: 17px;
    padding-bottom: 30px;
    line-height: 30px;
  }

  .image-coins {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    img {
      width: 100%;
    }
  }
`;
