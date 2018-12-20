/*
 * Landing
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

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
  NAME_FIELD,
  SUBJECT_FIELD,
  MESSAGE_FIELD,
} from './constants';

import { sendEmail, sendMessage } from './actions';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  componentDidMount() {
    const { hash } = window.location;
    const banner = window.$(`#${LANDING_ID}`);

    /*
     * Scroll to hash element
     */

    if (hash) {
      window.$('html, body').animate(
        {
          scrollTop: window.$(hash).offset().top,
        },
        250,
      );
    }

    if (banner.length) {
      const patterns = banner.find('.pattern');

      let x = 0;
      let y = 0;

      /*
       * Event @mousemove - @x, @y, coord. writing
       */

      window.$(window).on('mousemove', event => {
        x = event.pageX;
        y = event.pageY;
      });

      /*
       * Image animation
       */

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
                  transform: `translate(0px, ${direction * step +
                    translateY}px)`,
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

      /*
       * Header animation
       */

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

      /*
       * Parallax animation
       */

      window.requestAnimationFrame(function animation() {
        patterns.each(function() {
          const modifier = 50;

          window.$(this).css({
            transform: `translate(${x / modifier}px, ${y / modifier}px)`,
          });
        });

        window.requestAnimationFrame(animation);
      });
    }
  }

  componentWillUnmount() {
    window.$(window).off();
  }

  sendEmail = (...args) => {
    const { reset } = args[2];
    const formData = {
      email: args[0].get(EMAIL_FIELD),
    };

    this.props.sendEmailDispatch(formData, reset);
  };

  sendMessage = (...args) => {
    const { reset } = args[2];
    const formData = {
      email: args[0].get(EMAIL_FIELD),
      firstname: args[0].get(NAME_FIELD),
      lastname: args[0].get(SUBJECT_FIELD),
      message: args[0].get(MESSAGE_FIELD),
    };

    this.props.sendMessageDispatch(formData, reset);
  };

  render() {
    const translations = translationMessages[this.props.locale];

    return (
      <div id={LANDING_ID}>
        <Helmet>
          <title>{translations[messages.title.id]}</title>
          <meta
            name="description"
            content={translations[messages.description.id]}
          />
        </Helmet>

        <Introduction
          sendEmailLoading={this.props.sendEmailLoading}
          sendEmail={this.sendEmail}
          translations={translations}
        />
        <About translations={translations} />
        <Rewards
          translations={translations}
          sendEmail={this.sendEmail}
          sendEmailLoading={this.props.sendEmailLoading}
        />
        <FaqMain translations={translations} questionsNumber={6} />
        <Team
          translations={translations}
          sendMessage={this.sendMessage}
          sendMessageLoading={this.props.sendMessageLoading}
        />
        <Footer />
      </div>
    );
  }
}

HomePage.propTypes = {
  locale: PropTypes.string,
  sendEmailLoading: PropTypes.bool,
  sendMessageLoading: PropTypes.bool,
  sendEmailDispatch: PropTypes.func,
  sendMessageDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  sendEmailLoading: homepageSelectors.selectSendEmailLoading(),
  sendMessageLoading: homepageSelectors.selectSendMessageLoading(),
});

function mapDispatchToProps(dispatch) {
  const pageInfo = {
    url: window.location.href,
    name: messages.title.defaultMessage,
  };

  return {
    dispatch,
    sendEmailDispatch: (formData, reset) =>
      dispatch(sendEmail(formData, reset, pageInfo)),
    sendMessageDispatch: (formData, reset) =>
      dispatch(sendMessage(formData, reset, pageInfo)),
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
