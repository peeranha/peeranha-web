import React from 'react';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import * as routes from 'routes-config';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getQuestionCode, getSectionCode } from 'utils/mdManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import Seo from 'components/Seo';
import AsideBox from 'components/Base/Aside';

import Content from 'containers/Faq/Content';
import Aside from 'containers/Faq/Aside';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { getTerms } from './actions';

import Header from './Header';
import { SECTION_ID } from './constants';

/* eslint-disable react/prefer-stateless-function */
export class TermsOfService extends React.PureComponent {
  componentDidMount() {
    const { getTermsDispatch } = this.props;

    getTermsDispatch();
  }

  render() {
    const { locale, terms } = this.props;
    const translations = translationMessages[locale];

    if (!terms) return null;

    return (
      <div className="d-flex justify-content-center">
        <Seo
          title={translations[messages.title.id]}
          description={translations[messages.description.id]}
          language={locale}
          index={false}
        />

        <div className="flex-grow-1">
          <Header />
          <Content
            content={terms}
            route={routes.termsAndConditions}
            getSectionCode={getSectionCode.bind(null, SECTION_ID)}
            getQuestionCode={getQuestionCode.bind(null, SECTION_ID)}
          />
        </div>

        <AsideBox className="d-none d-xl-block">
          <Aside
            content={terms}
            route={(x) =>
              routes.termsAndConditions(getSectionCode(SECTION_ID, x))
            }
          />
        </AsideBox>
      </div>
    );
  }
}

TermsOfService.propTypes = {
  getTermsDispatch: PropTypes.func,
  locale: PropTypes.string,
  terms: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  terms: selectors.selectTerms(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getTermsDispatch: bindActionCreators(getTerms, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'termsOfService', reducer });
const withSaga = injectSaga({ key: 'termsOfService', saga });

export default compose(withReducer, withSaga, withConnect)(TermsOfService);
