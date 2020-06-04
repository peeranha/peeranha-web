import React from 'react';
import PropTypes from 'prop-types';

import { BORDER_PRIMARY } from 'style-constants';

import infoIcon from 'images/icon-information.svg?external';
import { showPopover } from 'utils/popover';

import Icon from 'components/Icon';

const InfoLabel = ({ id, children, message }) => (
  <button
    id={id}
    className="d-flex align-items-center"
    type="button"
    onClick={() => showPopover(id, message)}
  >
    {children}

    <Icon className="d-none d-sm-inline-block ml-1" icon={infoIcon} width="18" fill={BORDER_PRIMARY} />
  </button>
);

InfoLabel.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  message: PropTypes.string.isRequired,
};

export default React.memo(InfoLabel);
