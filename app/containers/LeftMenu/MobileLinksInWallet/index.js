import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import * as routes from 'routes-config';
import messages from 'common-messages';

import {
  MAX_STAKE_PREDICTION,
  MIN_STAKE_PREDICTION,
} from 'containers/Boost/constants';

import { getBoostWeeks } from 'utils/walletManagement';

import arrowDownIcon from 'images/arrowDown.svg?external';

import { selectRewardsWeeksNumber } from 'containers/Wallet/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import * as selectors from 'containers/Boost/selectors';

import WalletButton from 'containers/Header/WalletDropdown/WalletButton';
import { BoostPrediction } from 'containers/Header/WalletDropdown';
import NotificationIcon from 'containers/Header/WalletDropdown/NotificationIcon';

import A from 'components/A';
import Icon from 'components/Icon';

import SendTokens from 'containers/SendTokens';

const MobileLinksInWallet = ({
  profile,
  isMenuVisible,
  balance,
  stakedInCurrentPeriod = 0,
  stakedInNextPeriod = 0,
  rewardsWeeksNumber,
  locale,
  weekStat,
  globalBoostStat,
  userBoostStat,
}) => {
  const [visibleWalletLinks, setVisibilityWalletLinks] = useState(false);

  const isPositiveNumber = number => Number.isFinite(number) && number > 0;

  if (!profile || !isMenuVisible) {
    return null;
  }

  const boostWeeks = getBoostWeeks(weekStat, globalBoostStat, userBoostStat);
  const { currentWeek } = boostWeeks;
  const { userStake, maxStake } = currentWeek;

  let boost = 1;
  if (userStake && maxStake) {
    boost = userStake / maxStake * (MAX_STAKE_PREDICTION - MIN_STAKE_PREDICTION) + 1;
    boost = Math.floor(boost * 100) / 100;
  }

  const availableBalance =
    stakedInCurrentPeriod >= stakedInNextPeriod ?
      balance - stakedInCurrentPeriod :
      balance - stakedInNextPeriod;

  return (
    <div className="lightbg use-default-links">
      <button
        className="d-flex align-items-center justify-content-between w-100"
        onClick={() => setVisibilityWalletLinks(!visibleWalletLinks)}
      >
        <WalletButton
          balance={availableBalance}
          number={rewardsWeeksNumber}
          locale={locale}
          isBoost={boost > 1}
          mobile
        />
        <Icon
          className="mr-3"
          icon={arrowDownIcon}
          width="16"
          rotate={visibleWalletLinks}
        />
      </button>

      {visibleWalletLinks && (
        <div className="pb-2">
          <A to={routes.userWallet(profile.user)}>
            <FormattedMessage {...messages.wallet} />
            {isPositiveNumber(rewardsWeeksNumber) && (
              <NotificationIcon
                inline
                mobile
                number={rewardsWeeksNumber}
                id="MobileLinksInWallet"
                locale={locale}
              />
            )}
          </A>
          <A to={routes.userBoost(profile.user)}>
            <FormattedMessage {...messages.boost} />
            {boost > 1 && <BoostPrediction>×{boost}</BoostPrediction>}
          </A>
          <SendTokens>
            <FormattedMessage {...messages.sendTokens} />
          </SendTokens>
        </div>
      )}
    </div>
  );
};

MobileLinksInWallet.propTypes = {
  balance: PropTypes.number,
  stakedInCurrentPeriod: PropTypes.number,
  stakedInNextPeriod: PropTypes.number,
  profile: PropTypes.object,
  isMenuVisible: PropTypes.bool,
  rewardsWeeksNumber: PropTypes.number,
  locale: PropTypes.string,
  weekStat: PropTypes.array,
  globalBoostStat: PropTypes.array,
  userBoostStat: PropTypes.array,
};

export default memo(
  connect(
    createStructuredSelector({
      rewardsWeeksNumber: selectRewardsWeeksNumber(),
      locale: makeSelectLocale(),
      weekStat: selectors.selectWeekStat(),
      globalBoostStat: selectors.selectGlobalBoostStat(),
      userBoostStat: selectors.selectUserBoostStat(),
    }),
  )(MobileLinksInWallet),
);
