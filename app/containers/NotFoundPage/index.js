import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import * as routes from 'routes-config';
import { LINK_COLOR } from 'style-constants';

import notFoundImage from 'images/404.svg?inline';

import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import A, { ADefault } from 'components/A';
import P from 'components/P';
import Seo from 'components/Seo';
import Span from 'components/Span';
import Base from 'components/Base/BaseRounded';

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

const NotFound = ({ locale }) => {
  const { t } = useTranslation();

  useEffect(() => {
    window.isRendered = true;

    return () => {
      delete window.isRendered;
    };
  }, []);

  return (
    <React.Fragment>
      <Seo
        title={t('notFound.title')}
        description={t('notFound.description')}
        language={locale}
        index={false}
      />

      <Box>
        <div>
          <Span fontSize="24" bold>
            {t('notFound.weAreSorry')}
          </Span>
        </div>

        <div>
          <img src={notFoundImage} alt="404 page" />
        </div>

        <div>
          <P className="text-center mb-1">
            {t('notFound.tryToBrowse')}
            <A className="text-lowercase" to={routes.questions()}>
              <Span color={LINK_COLOR}>{t('common.posts')}</Span>
            </A>
          </P>
          <P className="text-center mb-1">
            {t('notFound.browseOurPopular')}
            <ADefault
              href={`${
                single ? process.env.APP_LOCATION : ''
              }${routes.communities()}`}
              className="text-lowercase"
            >
              <Span color={LINK_COLOR}>{t('common.communities')}</Span>
            </ADefault>
          </P>
          <P className="text-center mb-1">
            {t('notFound.ifYouFeelSomething')}
            <A className="text-lowercase" to={routes.support()}>
              <Span color={LINK_COLOR}>{t('common.contactUs')}</Span>
            </A>
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

export default connect(
  mapStateToProps,
  null,
)(NotFound);
