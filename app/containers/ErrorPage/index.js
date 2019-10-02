/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import commonMessages from 'common-messages';
import * as routes from 'routes-config';
import { TEXT_PRIMARY } from 'style-constants';

import errorImage from 'images/oops.svg?inline';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import notFoundPageMessages from 'containers/NotFoundPage/messages';
import { Box } from 'containers/NotFoundPage';

import A from 'components/A';
import P from 'components/P';
import Seo from 'components/Seo';
import Span from 'components/Span';

import errorPageMessages from './messages';

const NotFound = /* istanbul ignore next */ ({ locale }) => (
  <React.Fragment>
    <Seo
      title={translationMessages[locale][errorPageMessages.title.id]}
      description={
        translationMessages[locale][errorPageMessages.description.id]
      }
      language={locale}
      index={false}
    />

    <Box>
      <div>
        <Span fontSize="24" bold>
          <FormattedMessage {...errorPageMessages.weAreSorry} />
        </Span>
      </div>

      <div>
        <img src={errorImage} alt="404 page" />
      </div>

      <div>
        <P className="text-center mb-1">
          <FormattedMessage
            id={notFoundPageMessages.tryToBrowse.id}
            values={{
              value: (
                <A className="text-lowercase" to={routes.questions()}>
                  <Span color={TEXT_PRIMARY}>
                    <FormattedMessage {...commonMessages.questions} />
                  </Span>
                </A>
              ),
            }}
          />
        </P>
        <P className="text-center mb-1">
          <FormattedMessage
            id={notFoundPageMessages.browseOurPopular.id}
            values={{
              value: (
                <A className="text-lowercase" to={routes.communities()}>
                  <Span color={TEXT_PRIMARY}>
                    <FormattedMessage {...commonMessages.communities} />
                  </Span>
                </A>
              ),
            }}
          />
        </P>
        <P className="text-center mb-1">
          <FormattedMessage
            id={notFoundPageMessages.ifYouFeelSomething.id}
            values={{
              value: (
                <A className="text-lowercase" to={routes.support()}>
                  <Span color={TEXT_PRIMARY}>
                    <FormattedMessage {...commonMessages.contactUs} />
                  </Span>
                </A>
              ),
            }}
          />
        </P>
      </div>
    </Box>
  </React.Fragment>
);

NotFound.propTypes = {
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

export default connect(
  mapStateToProps,
  null,
)(NotFound);
