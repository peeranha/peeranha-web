import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { TEXT_WARNING_LIGHT, TEXT_SECONDARY } from 'style-constants';

import currencyPeerImage from 'images/currencyPeer.svg?inline';

import P from 'components/P';
import Span from 'components/Span';
import Base from 'components/Base';
import SmallImage from 'components/Img/SmallImage';

import WeekNumber from './WeekNumber';

const PendingWeek = ({ period, locale, periodStarted, periodFinished }) => {
  const { t } = useTranslation();

  return (
    <li className="flex-grow-1 mb-3">
      <Base position="top">
        <P className="mb-1" color={TEXT_WARNING_LIGHT} fontSize="13">
          {t('wallet.payoutPending')}
        </P>
        <WeekNumber
          locale={locale}
          period={period}
          periodStarted={periodStarted}
          periodFinished={periodFinished}
        />
      </Base>
      <Base position="bottom">
        <>
          <P className="mb-1" fontSize="14" color={TEXT_SECONDARY}>
            {t('wallet.estimatedPayout')}
          </P>
          <P className="d-flex align-items-center">
            <SmallImage className="mr-2" src={currencyPeerImage} alt="icon" />
            <Span mobileFS={14}>{t('wallet.weAreAnalyzing')}</Span>
          </P>
        </>
      </Base>
    </li>
  );
};

PendingWeek.propTypes = {
  period: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  locale: PropTypes.string,
  reward: PropTypes.number,
  periodStarted: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  periodFinished: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default memo(PendingWeek);
