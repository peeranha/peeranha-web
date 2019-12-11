/**
 *
 * PrivacyPolicy
 *
 */

import React from 'react';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import * as routes from 'routes-config';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getQuestionCode, getSectionCode } from 'utils/privacyPolicyManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import Seo from 'components/Seo';
import AsideBox from 'components/Base/Aside';

import Content from 'containers/Faq/Content';
import Aside from 'containers/Faq/Aside';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { getPrivacyPolicy } from './actions';

import Header from './Header';

// TODO: back left menu link (sign up (with \ without) checkbox agreement)

/* eslint-disable react/prefer-stateless-function */
export class PrivacyPolicy extends React.PureComponent {
  componentDidMount() {
    this.props.getPrivacyPolicyDispatch();
  }

  render() {
    const { locale, privacyPolicy } = this.props;
    const translations = translationMessages[locale];

    if (!privacyPolicy) return null;

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
            content={privacyPolicy}
            route={routes.privacyPolicy}
            getSectionCode={getSectionCode}
            getQuestionCode={getQuestionCode}
          />
        </div>

        <AsideBox className="d-none d-xl-block">
          <Aside
            content={privacyPolicy}
            route={x => routes.privacyPolicy(getSectionCode(x))}
          />
        </AsideBox>
      </div>
    );
  }
}

PrivacyPolicy.propTypes = {
  getPrivacyPolicyDispatch: PropTypes.func,
  locale: PropTypes.string,
  privacyPolicy: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  privacyPolicy: selectors.selectPrivacyPolicy(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getPrivacyPolicyDispatch: bindActionCreators(getPrivacyPolicy, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'privacyPolicy', reducer });
const withSaga = injectSaga({ key: 'privacyPolicy', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PrivacyPolicy);
