import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BG_LIGHT, BORDER_PRIMARY_LIGHT, TEXT_DARK } from 'style-constants';

const Base = styled.div`
  position: absolute;
  background-color: ${BG_LIGHT};
  width: 290px;
  text-align: left;
  z-index: 100;
  top: 30px;
  border-radius: 5px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  padding: 15px;

  span {
    color: ${TEXT_DARK};
  }

  > ul {
    li {
      color: ${TEXT_DARK};
      margin-left: 15px;
    }

    li::before {
      content: '\\2022';
      color: ${BORDER_PRIMARY_LIGHT};
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }
`;

const ExpertPopover = ({ date, bountyMessage }) => (
  <Base>
    <span>{bountyMessage}</span>
    {date && (
      <span>
        You can get this bounty until<br />
        {date}
      </span>
    )}
  </Base>
);

ExpertPopover.propTypes = {
  date: PropTypes.string,
  bountyMessage: PropTypes.string,
};

export default memo(ExpertPopover);
