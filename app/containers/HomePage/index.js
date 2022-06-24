/*
 * Landing
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Seo from 'components/Seo';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { loginWithWallet } from 'containers/Login/actions';
import { checkEmail } from 'containers/SignUp/actions';
import { selectEmailChecking } from 'containers/SignUp/selectors';

import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import { selectFaqQuestions } from 'containers/DataCacheProvider/selectors';

import {
  WHAT_IS_PEERANHA,
  HOT_IT_DIFF,
  HOW_IT_WORKS,
  WHERE_TOKENS_COME_FROM,
  VALUE_OF_TOKEN,
} from 'containers/Faq/constants';

import reducer from './reducer';
import saga from './saga';
import * as homepageSelectors from './selectors';

import Footer from './Footer';
import Introduction from './Introduction';
import About from './About';
import Rewards from './Rewards';
import FaqMain from './FaqMain';
import Team from './Team';

import {
  HEADER_ID,
  LANDING_ID,
  ANIMATE_IMAGE,
  ANIMATE_TEXT,
  SECOND_SCREEN,
  THIRD_SCREEN,
  EMAIL_FIELD,
} from './constants';

import { sendMessage } from './actions';

import messages from './messages';

const imagesAnimation = () => {
  window.addEventListener('DOMMouseScroll mousewheel', event => {
    const { scrollY } = event.currentTarget;
    const secondScreenPos = document
      .querySelector(`#${SECOND_SCREEN}`)
      .position().top;
    const thirdScreenPos = document.querySelector(`#${THIRD_SCREEN}`).position()
      .top;

    const animatedImagesArray = document.querySelectorAll(`.${ANIMATE_IMAGE}`);

    if (scrollY > secondScreenPos && scrollY < thirdScreenPos) {
      animatedImagesArray.each(animatedImage => {
        const direction = event.originalEvent.wheelDelta < 0 ? -1 : 1;
        const translatorMax = 30;
        const step = translatorMax * 0.15;

        const matrix = animatedImage
          .css('transform')
          .replace(/[^0-9\-.,]/g, '')
          .split(',');

        const translateY = +(matrix[13] || matrix[5]) || 0;
        const imageY = animatedImage.offset().top;

        if (
          scrollY + window.innerHeight / 2 > imageY &&
          scrollY - window.innerHeight / 2 < imageY
        ) {
          if (Math.abs(direction * step + translateY) < translatorMax) {
            animatedImage.style.transform = `translate(0px, ${direction * step +
              translateY}px)`;

            animatedImage
              .parent()
              .parent()
              .find(`.${ANIMATE_TEXT}`)
              .css({
                transform: `translate(0px, ${-direction * step -
                  translateY}px)`,
              });
          }
        }
      });
    }
  });
};

const headerAnimation = () => {
  window.addEventListener('scroll', event => {
    const { scrollY } = event.currentTarget;
    const { innerHeight } = window;

    const show = document
      .querySelector(`#${HEADER_ID}`)
      .classList.contains('scroll');

    if (scrollY > innerHeight * 0.9 && !show) {
      document.querySelector(`#${HEADER_ID}`).classList.add('scroll');
    } else if (scrollY < innerHeight * 0.9 && show) {
      document.querySelector(`#${HEADER_ID}`).classList.remove('scroll');
    }
  });
};

const parallaxAnimation = () => {
  let x = 0;
  let y = 0;

  window.addEventListener('mousemove', event => {
    x = event.pageX;
    y = event.pageY;
  });

  window.requestAnimationFrame(function animation() {
    const modifier = 50;
    const patterns = document.querySelectorAll('.pattern');

    patterns.forEach(pattern => {
      pattern.style.transform = `translate(${x / modifier}px, ${y /
        modifier}px)`;
    });

    window.requestAnimationFrame(animation);
  });
};

export const HomePage = ({
  locale,
  location,
  sendMessageDispatch,
  sendMessageLoading,
  loginWithWalletDispatch,
  emailChecking,
  faqQuestions,
  account,
  checkEmailDispatch,
}) => {
  const verifyEmail = val => checkEmailDispatch(val.get(EMAIL_FIELD));
  const translations = translationMessages[locale];

  useEffect(() => {
    imagesAnimation();
    headerAnimation();
    parallaxAnimation();
  }, []);

  return (
    <div id={LANDING_ID}>
      <Seo
        title={translations[messages.title.id]}
        description={translations[messages.description.id]}
        language={locale}
      />

      <Introduction
        account={account}
        translations={translations}
        location={location}
        showLoginModal={() => loginWithWalletDispatch({ metaMask: true })}
        checkEmail={verifyEmail}
        emailChecking={emailChecking}
      />

      <About translations={translations} />

      <Rewards
        translations={translations}
        checkEmail={verifyEmail}
        emailChecking={emailChecking}
      />

      <FaqMain faqQuestions={faqQuestions} />

      <Team
        translations={translations}
        sendMessage={sendMessageDispatch}
        sendMessageLoading={sendMessageLoading}
      />

      <Footer locale={locale} />
    </div>
  );
};

HomePage.propTypes = {
  locale: PropTypes.string,
  account: PropTypes.string,
  emailChecking: PropTypes.bool,
  sendMessageLoading: PropTypes.bool,
  checkEmailDispatch: PropTypes.func,
  sendMessageDispatch: PropTypes.func,
  location: PropTypes.object,
  faqQuestions: PropTypes.array,
};

const withConnect = connect(
  createStructuredSelector({
    account: makeSelectAccount(),
    locale: makeSelectLocale(),
    emailChecking: selectEmailChecking(),
    sendMessageLoading: homepageSelectors.selectSendMessageLoading(),
    faqQuestions: selectFaqQuestions([
      WHAT_IS_PEERANHA,
      HOT_IT_DIFF,
      HOW_IT_WORKS,
      WHERE_TOKENS_COME_FROM,
      VALUE_OF_TOKEN,
    ]),
  }),
  dispatch => ({
    sendMessageDispatch: bindActionCreators(sendMessage, dispatch),
    loginWithWalletDispatch: bindActionCreators(loginWithWallet, dispatch),
    checkEmailDispatch: bindActionCreators(checkEmail, dispatch),
  }),
);

const withReducer = injectReducer({ key: 'homepage', reducer });
const withSaga = injectSaga({ key: 'homepage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
