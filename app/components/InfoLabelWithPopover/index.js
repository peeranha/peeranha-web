import React from 'react';
import PropTypes from 'prop-types';

import infoIcon from 'images/icon-information.svg?inline';
import { showPopover } from 'utils/popover';

const InfoLabel = ({ id, children, message }) => (
  <button
    id={id}
    className="d-flex align-items-center"
    type="button"
    onClick={() => showPopover(id, message)}
  >
    {children}
    <img className="ml-1" src={infoIcon} alt="popover tip" />
  </button>
);

InfoLabel.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  message: PropTypes.string.isRequired,
};

export default React.memo(InfoLabel);
