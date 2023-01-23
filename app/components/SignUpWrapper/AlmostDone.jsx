import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import * as routes from 'routes-config';

import peeranhaLogo from 'images/LogoBlack.svg?inline';
import almostDoneBanner from 'images/communityIsSuggested.svg?inline';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  singleCommunityStyles,
  isSingleCommunityWebsite,
} from 'utils/communityManagement';

import { selectFaqQuestions } from 'containers/DataCacheProvider/selectors';
import { selectLogo } from 'containers/Home/selectors';

import H3 from 'components/H3';
import { InfoLink } from 'components/Button/Outlined/InfoLarge';

import {
  ALMOST_DONE_1ST_QUESTION,
  ALMOST_DONE_2ST_QUESTION,
  ALMOST_DONE_3ST_QUESTION,
} from 'containers/Faq/constants';
import { DAEMON } from 'utils/constants';
import { HOME_KEY } from 'containers/Home/constants';

import { getLogo } from 'containers/Home/actions';
import reducer from 'containers/Home/reducer';
import saga from 'containers/Home/saga';

import SignUpWrapper from './index';
import {
  Li,
  P,
  CommunityLogoWrapper,
  Logo,
  CommunityLogoDescr,
} from './SignUpOptions';

const styles = singleCommunityStyles();
const single = isSingleCommunityWebsite();

const LeftMenu = ({ faqQuestions, mainLogo }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="mb-4">
        {styles.withoutSubHeader ? (
          <CommunityLogoWrapper>
            <Link to={routes.questions()} href={routes.questions()}>
              <Logo src={mainLogo} width={styles.signUpLogoWidth} />
            </Link>
            <CommunityLogoDescr>
              <span>Q&A on</span>
              <Link to={routes.questions()} href={routes.questions()}>
                <img src={peeranhaLogo} width="90px" alt="Peeranha logo" />
              </Link>
            </CommunityLogoDescr>
          </CommunityLogoWrapper>
        ) : (
          <Link to={routes.questions()} href={routes.questions()}>
            <img src={peeranhaLogo} width="180px" alt="Peeranha logo" />
          </Link>
        )}
      </div>

      <H3 className="d-flex align-items-center mb-4">
        {t('signUp.almostDone')}
      </H3>

      <div className="mb-4">
        <P>{t('signUp.firstParagraphAlmostDone')}</P>
        <P>{t('signUp.secondParagraphAlmostDone')}</P>
        <P>{t('signUp.thirdParagraphAlmostDone')}</P>
      </div>

      {faqQuestions && (
        <ul className="mb-4">
          {faqQuestions.map(x => <Li key={x.props.children}>{x}</Li>)}
        </ul>
      )}
    </>
  );
};

const RightMenu = ({ message }) => {
  const { t } = useTranslation();

  return (
    <div className="text-center py-5 px-4">
      <img
        className="mb-2"
        src={almostDoneBanner}
        alt="peeranha registration almost done"
      />
      <P className="text-center mb-4" mobileFS="16">
        {message}
      </P>
      <div>
        <InfoLink to={routes.questions()} className="w-100">
          {t('common.goToMainPage')}
        </InfoLink>
      </div>
    </div>
  );
};

const AlmostDone = ({ faqQuestions, message, logo, getLogoDispatch }) => {
  useEffect(
    () => {
      getLogoDispatch();
    },
    [single],
  );

  return (
    <SignUpWrapper
      LeftMenuChildren={
        <LeftMenu faqQuestions={faqQuestions} mainLogo={logo} />
      }
      RightMenuChildren={<RightMenu message={message} />}
    />
  );
};

const withConnect = connect(
  createStructuredSelector({
    faqQuestions: selectFaqQuestions([
      ALMOST_DONE_1ST_QUESTION,
      ALMOST_DONE_2ST_QUESTION,
      ALMOST_DONE_3ST_QUESTION,
    ]),
    logo: selectLogo(),
  }),
  dispatch => ({
    getLogoDispatch: bindActionCreators(getLogo, dispatch),
  }),
);

export default compose(
  injectReducer({ key: HOME_KEY, reducer }),
  injectSaga({ key: HOME_KEY, saga, mode: DAEMON }),
  withConnect,
)(AlmostDone);
