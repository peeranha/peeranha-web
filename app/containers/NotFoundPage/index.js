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

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import commonMessages from 'common-messages';
import * as routes from 'routes-config';
import { LINK_COLOR } from 'style-constants';

import notFoundImage from 'images/404.svg?inline';
import errorImage from 'images/oops.svg?inline';
import history from 'createdHistory';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import A, { ADefault } from 'components/A';
import P from 'components/P';
import Seo from 'components/Seo';
import Span from 'components/Span';
import Base from 'components/Base/BaseRounded';

import messages from './messages';

const single = isSingleCommunityWebsite();

export const Box = Base.extend`
  text-align: center;
  padding-top: 50px !important;
  padding-bottom: 150px !important;

  img {
    margin-top: 50px;
    margin-bottom: 25px;
  }

  @media only screen and (max-width: 768px) {
    img {
      width: 100%;
    }
  }
`;

const NotFound = /* istanbul ignore next */ ({ locale }) => {
  useEffect(() => {
    window.isRendered = true;

    return () => {
      delete window.isRendered;
    };
  }, []);

  const isUrlGetParameter =
    new URLSearchParams(history.location.search).get('type') === 'deleted';

  return (
    <React.Fragment>
      <Seo
        title={translationMessages[locale][messages.title.id]}
        description={translationMessages[locale][messages.description.id]}
        language={locale}
        index={false}
      />

      <Box>
        <div>
          <Span fontSize="24" bold>
            <FormattedMessage
              id={
                isUrlGetParameter
                  ? messages.weAreSorryIsDeleted.id
                  : messages.weAreSorry.id
              }
            />
          </Span>
        </div>

        <div>
          <img
            src={isUrlGetParameter ? errorImage : notFoundImage}
            alt="404 page"
          />
        </div>

        <div>
          <P className="text-center mb-1">
            <FormattedMessage
              id={messages.tryToBrowse.id}
              values={{
                value: (
                  <A className="text-lowercase" to={routes.questions()}>
                    <Span color={LINK_COLOR}>
                      <FormattedMessage id={commonMessages.posts.id} />
                    </Span>
                  </A>
                ),
              }}
            />
          </P>
          <P className="text-center mb-1">
            <FormattedMessage
              id={messages.browseOurPopular.id}
              values={{
                value: (
                  <ADefault
                    href={`${
                      single ? process.env.APP_LOCATION : ''
                    }${routes.communities()}`}
                    className="text-lowercase"
                  >
                    <Span color={LINK_COLOR}>
                      <FormattedMessage {...commonMessages.communities} />
                    </Span>
                  </ADefault>
                ),
              }}
            />
          </P>
          <P className="text-center mb-1">
            <FormattedMessage
              id={messages.ifYouFeelSomething.id}
              values={{
                value: (
                  <A className="text-lowercase" to={routes.support()}>
                    <Span color={LINK_COLOR}>
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
};

NotFound.propTypes = {
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

export default connect(mapStateToProps, null)(NotFound);
