import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';

import { TEXT_PRIMARY } from 'style-constants';

import closeCircleIcon from 'images/closeCircle.svg?external';

import { IconMd } from 'components/Icon/IconWithSizes';
import { markAllNotificationsAsRead } from './actions';
import injectSaga from '../../utils/injectSaga';
import notificationsSaga from './saga';
import { DAEMON } from '../../utils/constants';

const MarkAllAsReadButton = ({ markAllAsReadDispatch }) => (
  <button
    style={{ color: TEXT_PRIMARY }}
    className="d-flex align-items-center"
    onClick={markAllAsReadDispatch}
    type="button"
  >
    <IconMd className="mr-2" icon={closeCircleIcon} fill={TEXT_PRIMARY} />
    <FormattedMessage id={commonMessages.markAllAsRead.id} />
  </button>
);

MarkAllAsReadButton.propTypes = {
  markAllAsReadDispatch: PropTypes.func,
};

export default memo(
  compose(
    injectSaga({ key: 'notifications', saga: notificationsSaga, mode: DAEMON }),
    connect(null, (dispatch) => ({
      markAllAsReadDispatch: bindActionCreators(
        markAllNotificationsAsRead,
        dispatch,
      ),
    })),
  )(MarkAllAsReadButton),
);
