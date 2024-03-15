import React, { memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { useTranslation } from 'react-i18next';

import CloseRoundedIcon from 'icons/CloseRounded';
import { TEXT_PRIMARY } from 'style-constants';

import { DAEMON } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

import { XCircleGraph } from 'components/icons';

import notificationsSaga from './saga';
import { markAllNotificationsAsRead } from './actions';
import { styles } from './MarkAllAsReadButton.styled';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const MarkAllAsReadButton: React.FC<{ markAllAsReadDispatch: () => void }> = ({
  markAllAsReadDispatch,
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <button style={styles.markAllButton} onClick={markAllAsReadDispatch}>
      {graphCommunity ? (
        <XCircleGraph className="mr-1" size={[24, 24]} />
      ) : (
        <CloseRoundedIcon
          stroke={colors.btnColor || TEXT_PRIMARY}
          fill={colors.btnColor || TEXT_PRIMARY}
          css={styles.markAllIcon}
          circleFill={TEXT_PRIMARY}
        />
      )}
      {t('common.markAllAsRead')}
    </button>
  );
};

export default memo(
  compose(
    injectSaga({ key: 'notifications', saga: notificationsSaga, mode: DAEMON }),
    connect(null, (dispatch) => ({
      markAllAsReadDispatch: bindActionCreators(markAllNotificationsAsRead, dispatch),
    })),
  )(MarkAllAsReadButton),
);
