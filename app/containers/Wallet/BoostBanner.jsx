import React from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as routes from 'routes-config';
import { getQuestionCode, getSectionCode } from 'utils/mdManagement';

import { TEXT_PRIMARY, TEXT_LIGHT } from 'style-constants';
import {
  SECTION_ID,
  BOOST_SECTION,
  WHAT_IS_BOOST,
  HOW_TO_MAKE_A_STAKE,
} from 'containers/Faq/constants';

import activateBoostBanner from 'images/boost-banner.svg?inline';

import Wrapper from 'components/Banner';
import Button from 'components/Button/Contained/InfoLarge';
import A from 'components/A';
import Span from 'components/Span';
import { REWARD_CLAIMING_ENABLED } from '../../utils/constants';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();
const GoToBoostPage = Button.extend`
  margin-top: 10px;

  :hover {
    color: ${TEXT_LIGHT};
  }
`.withComponent(Link);

const Container = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 1005px) {
    img {
      display: none;
    }
  }
`;
const WhatABoostIs = () => {
  const { t } = useTranslation();

  return (
    <A
      to={routes.faq(getQuestionCode(SECTION_ID, ...WHAT_IS_BOOST.split('.')))}
    >
      <Span color={TEXT_PRIMARY}>{t('wallet.whatABoostIs')}</Span>
    </A>
  );
};

const HowToStake = () => {
  const { t } = useTranslation();

  return (
    <A
      to={routes.faq(
        getQuestionCode(SECTION_ID, ...HOW_TO_MAKE_A_STAKE.split('.')),
      )}
    >
      <Span color={TEXT_PRIMARY}>{t('wallet.howToStake')}</Span>
    </A>
  );
};

const FAQs = () => {
  const { t } = useTranslation();

  return (
    <A to={routes.faq(getSectionCode(SECTION_ID, BOOST_SECTION))}>
      <Span color={TEXT_PRIMARY}>{t('wallet.FAQs')}</Span>
    </A>
  );
};

const BoostBanner = ({ userId }) => {
  const { t } = useTranslation();

  return (
    <Wrapper className="mt-3">
      <Container>
        <img src={activateBoostBanner} alt="boost-banner" />

        {(REWARD_CLAIMING_ENABLED && (
          <div>
            <p>{t('wallet.getMoreWithBoost')}</p>

            <p
              css={css`
                a {
                  span {
                    color: ${colors.linkColor || TEXT_PRIMARY};
                  }
                }
              `}
            >
              <Trans
                i18nKey="wallet.boostHelp"
                values={{ whatABoostIs: t('wallet.whatABoostIs') }}
                components={[
                  <WhatABoostIs key="0" />,
                  <HowToStake key="1" />,
                  <FAQs key="2" />,
                ]}
              />
            </p>

            <GoToBoostPage to={routes.userBoost(userId)}>
              {t('common.activateBoost')}
            </GoToBoostPage>
          </div>
        )) || (
          <div>
            <p>{t('common.rewardsWillBeAvailable')}</p>
          </div>
        )}
      </Container>
    </Wrapper>
  );
};

BoostBanner.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default React.memo(BoostBanner);
