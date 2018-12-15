/*
 * Landing
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { addToast } from 'containers/Toast/actions';

import Landing from './Landing';
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
  SECOND_SCREEN,
  THIRD_SCREEN,
} from './constants';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    HomePage.props = this.props;
  }

  componentDidMount() {
    const banner = window.$(`#${LANDING_ID}`);

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
            const translatorMax = 50;
            const step = translatorMax * 0.25;

            const matrix = window
              .$(this)
              .css('transform')
              .replace(/[^0-9\-.,]/g, '')
              .split(',');
            const translateY = +(matrix[13] || matrix[5]);

            if (Math.abs(direction * step + translateY) < translatorMax) {
              window.$(this).css({
                transform: `translate(0px, ${direction * step + translateY}px)`,
              });
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

  static sendEmail = (...args) => {
    const toast = {
      type: 'error',
      text:
        translationMessages[HomePage.props.locale][
          messages.messageHasNotBeenSent.id
        ],
    };

    console.log(args);

    HomePage.props.addToastDispatch(toast);
  };

  static sendMessage = (...args) => {
    const toast = {
      type: 'error',
      text:
        translationMessages[HomePage.props.locale][
          messages.messageHasNotBeenSent.id
        ],
    };

    console.log(args);

    HomePage.props.addToastDispatch(toast);
  };

  render() {
    const translations = translationMessages[this.props.locale];

    return (
      <Landing id={LANDING_ID}>
        <Helmet>
          <title>{translations[messages.title.id]}</title>
          <meta
            name="description"
            content={translations[messages.description.id]}
          />
        </Helmet>

        <Introduction translations={translations} />
        <About translations={translations} />
        <Rewards translations={translations} />
        <FaqMain translations={translations} questionsNumber={6} />
        <Team translations={translations} />
        <Footer />
      </Landing>
    );
  }
}

HomePage.propTypes = {
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addToastDispatch: toast => dispatch(addToast(toast)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
