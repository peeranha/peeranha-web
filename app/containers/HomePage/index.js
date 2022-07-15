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
import Partners from './Partners';
import FeedbackForm from './FeedbackForm';

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
  window.$(window).on('DOMMouseScroll mousewheel', event => {
    const { scrollY } = event.currentTarget;
    const secondScreenPos = window.$(`#${SECOND_SCREEN}`).position().top;
    const thirdScreenPos = window.$(`#${THIRD_SCREEN}`).position().top;

    const animatedImagesArray = window.$(`.${ANIMATE_IMAGE}`);

    if (scrollY > secondScreenPos && scrollY < thirdScreenPos) {
      animatedImagesArray.each(function() {
        const direction = event.originalEvent.wheelDelta < 0 ? -1 : 1;
        const translatorMax = 30;
        const step = translatorMax * 0.15;

        const matrix = window
          .$(this)
          .css('transform')
          .replace(/[^0-9\-.,]/g, '')
          .split(',');

        const translateY = +(matrix[13] || matrix[5]) || 0;
        const imageY = window.$(this).offset().top;

        // Check if image is in area of scrolling
        if (
          scrollY + window.innerHeight / 2 > imageY &&
          scrollY - window.innerHeight / 2 < imageY
        ) {
          if (Math.abs(direction * step + translateY) < translatorMax) {
            // Image translating
            window.$(this).css({
              transform: `translate(0px, ${direction * step + translateY}px)`,
            });

            // Text translating
            window
              .$(this)
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
  window.$(window).on('scroll', event => {
    const { scrollY } = event.currentTarget;
    const { innerHeight } = window;

    const show = window.$(`#${HEADER_ID}`).hasClass('scroll');

    if (scrollY > innerHeight * 0.9 && !show) {
      window.$(`#${HEADER_ID}`).addClass('scroll');
    } else if (scrollY < innerHeight * 0.9 && show) {
      window.$(`#${HEADER_ID}`).removeClass('scroll');
    }
  });
};

const parallaxAnimation = () => {
  const patterns = window.$(`#${LANDING_ID}`).find('.pattern');

  let x = 0;
  let y = 0;

  window.$(window).on('mousemove', event => {
    x = event.pageX;
    y = event.pageY;
  });

  window.requestAnimationFrame(function animation() {
    patterns.each(function() {
      const modifier = 50;

      window.$(this).css({
        transform: `translate(${x / modifier}px, ${y / modifier}px)`,
      });
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
  account,
}) => {
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
      />

      <About translations={translations} />
      
      <Partners />
      <Rewards
        translations={translations}
      />
      <FeedbackForm
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
  sendMessageLoading: PropTypes.bool,
  sendMessageDispatch: PropTypes.func,
  location: PropTypes.object,
  loginWithWalletDispatch: PropTypes.func,
};

const withConnect = connect(
  createStructuredSelector({
    account: makeSelectAccount(),
    locale: makeSelectLocale(),
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
  }),
);

const withReducer = injectReducer({ key: 'homepage', reducer });
const withSaga = injectSaga({ key: 'homepage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
