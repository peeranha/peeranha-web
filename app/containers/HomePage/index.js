/*
 * Landing
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { scrollToSection } from 'utils/animation';

import Seo from 'components/Seo';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { showLoginModal } from 'containers/Login/actions';
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

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  componentDidMount() {
    this.imagesAnimation();

    this.headerAnimation();

    this.parallaxAnimation();

    scrollToSection();
  }

  componentWillUnmount() {
    window.$(window).off();
  }

  imagesAnimation /* istanbul ignore next */ = () => {
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

  headerAnimation /* istanbul ignore next */ = () => {
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

  parallaxAnimation /* istanbul ignore next */ = () => {
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

  checkEmail = val => {
    this.props.checkEmailDispatch(val.get(EMAIL_FIELD));
  };

  render() {
    const {
      locale,
      location,
      sendMessageDispatch,
      sendMessageLoading,
      showLoginModalDispatch,
      emailChecking,
      faqQuestions,
      account,
    } = this.props;

    const translations = translationMessages[locale];

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
          showLoginModal={showLoginModalDispatch}
          checkEmail={this.checkEmail}
          emailChecking={emailChecking}
        />

        <About translations={translations} />

        <Rewards
          translations={translations}
          checkEmail={this.checkEmail}
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
  }
}

HomePage.propTypes = {
  locale: PropTypes.string,
  account: PropTypes.string,
  emailChecking: PropTypes.bool,
  sendMessageLoading: PropTypes.bool,
  checkEmailDispatch: PropTypes.func,
  sendMessageDispatch: PropTypes.func,
  showLoginModalDispatch: PropTypes.func,
  location: PropTypes.object,
  faqQuestions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
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
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    sendMessageDispatch: bindActionCreators(sendMessage, dispatch),
    showLoginModalDispatch: bindActionCreators(showLoginModal, dispatch),
    checkEmailDispatch: bindActionCreators(checkEmail, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homepage', reducer });
const withSaga = injectSaga({ key: 'homepage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
