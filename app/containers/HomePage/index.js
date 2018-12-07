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

import Landing from './Landing';
import Header from './Header';
import Footer from './Footer';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import ThirdScreen from './ThirdScreen';
import FourthScreen from './FourthScreen';
import FifthScreen from './FifthScreen';

import { HEADER_ID, LANDING_ID } from './constants';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
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
       * Header animation
       */

      window.$(window).on('scroll', event => {
        const { scrollY } = event.currentTarget;
        const { innerHeight } = window;

        const show = window.$(`#${HEADER_ID}`).hasClass('scroll');

        if (scrollY > innerHeight * 0.9 && !show) {
          window.$(`#${HEADER_ID}`).addClass('scroll');
        } else if (scrollY < 100 && show) {
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

        <Header />
        <FirstScreen translations={translations} />
        <SecondScreen translations={translations} />
        <ThirdScreen translations={translations} />
        <FourthScreen translations={translations} />
        <FifthScreen translations={translations} />
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

export default connect(
  mapStateToProps,
  null,
)(HomePage);
