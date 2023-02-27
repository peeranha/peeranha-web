import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
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
import VideoSection from './VideoSection';

import {
  HEADER_ID,
  LANDING_ID,
  ANIMATE_IMAGE,
  ANIMATE_TEXT,
  SECOND_SCREEN,
  THIRD_SCREEN,
} from './constants';

import { sendMessage } from './actions';

const imagesAnimation = () => {
  window.addEventListener('DOMMouseScroll mousewheel', (event) => {
    const { scrollY } = event.currentTarget;
    const secondScreenPos = document
      .querySelector(`#${SECOND_SCREEN}`)
      .position().top;
    const thirdScreenPos = document
      .querySelector(`#${THIRD_SCREEN}`)
      .position().top;

    const animatedImagesArray = document.querySelectorAll(`.${ANIMATE_IMAGE}`);

    if (scrollY > secondScreenPos && scrollY < thirdScreenPos) {
      animatedImagesArray.each((animatedImage) => {
        const direction = event.originalEvent.wheelDelta < 0 ? -1 : 1;
        const translatorMax = 30;
        const step = translatorMax * 0.15;

        const matrix = animatedImage
          .css('transform')
          .replace(/[^0-9\-.,]/g, '')
          .split(',');

        const translateY = +(matrix[13] || matrix[5]) || 0;
        const imageY = animatedImage.offset().top;

        // Check if image is in area of scrolling
        if (
          scrollY + window.innerHeight / 2 > imageY &&
          scrollY - window.innerHeight / 2 < imageY
        ) {
          if (Math.abs(direction * step + translateY) < translatorMax) {
            animatedImage.style.transform = `translate(0px, ${
              direction * step + translateY
            }px)`;

            animatedImage
              .parent()
              .parent()
              .find(`.${ANIMATE_TEXT}`)
              .css({
                transform: `translate(0px, ${
                  -direction * step - translateY
                }px)`,
              });
          }
        }
      });
    }
  });
};

const headerAnimation = () => {
  window.addEventListener('scroll', (event) => {
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

  window.addEventListener('mousemove', (event) => {
    x = event.pageX;
    y = event.pageY;
  });

  window.requestAnimationFrame(function animation() {
    const modifier = 50;
    const patterns = document.querySelectorAll('.pattern');

    patterns.forEach((pattern) => {
      pattern.style.transform = `translate(${x / modifier}px, ${
        y / modifier
      }px)`;
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
  const { t } = useTranslation();

  useEffect(() => {
    imagesAnimation();
    headerAnimation();
    parallaxAnimation();
  }, []);

  return (
    <div id={LANDING_ID}>
      <Seo
        title={t('about.title')}
        description={t('about.description')}
        language={locale}
      />

      <Introduction
        account={account}
        location={location}
        showLoginModal={() => loginWithWalletDispatch({ metaMask: true })}
      />

      <VideoSection />
      <About />

      <Partners />
      <Rewards />
      <FeedbackForm
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
  (dispatch) => ({
    sendMessageDispatch: bindActionCreators(sendMessage, dispatch),
    loginWithWalletDispatch: bindActionCreators(loginWithWallet, dispatch),
  }),
);

const withReducer = injectReducer({ key: 'homepage', reducer });
const withSaga = injectSaga({ key: 'homepage', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
