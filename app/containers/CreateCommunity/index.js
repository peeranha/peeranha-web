/**
 *
 * CreateCommunity
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translationMessages, DEFAULT_LOCALE } from 'i18n';
import { compose, bindActionCreators } from 'redux';
import * as routes from 'routes-config';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Seo from 'components/Seo';
import TipsBase from 'components/Base/TipsBase';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectFaqQuestions } from 'containers/DataCacheProvider/selectors';

import {
  WHAT_IS_COMMUNITY_QUESTION,
  WHO_MANAGES_COMMUNITY_QUESTION,
} from 'containers/Faq/constants';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { createCommunity, setDefaultStore } from './actions';

import {
  COMM_NAME_FIELD,
  COMM_SHORT_DESCRIPTION_FIELD,
  COMM_MAIN_DESCRIPTION_FIELD,
  TAG_NAME_FIELD,
  LANGUAGE_FIELD,
  TAG_DESCRIPTION_FIELD,
  COMM_AVATAR_FIELD,
} from './constants';

import Form from './Form';
import Header from './Header';
import Tips from './Tips';
import Banner from './Banner';

const createCommunityRoute = routes.communitiesCreate();

/* eslint-disable react/prefer-stateless-function */
export class CreateCommunity extends React.PureComponent {
  componentWillUnmount() {
    this.props.setDefaultStoreDispatch();
  }

  createCommunity = (...args) => {
    const { reset } = args[2];
    const values = args[0].toJS();

    const tags = Object.keys(values.tags)
      .filter(x => values.tags[x])
      .map(x => ({
        name: values.tags[x][TAG_NAME_FIELD],
        description: values.tags[x][TAG_DESCRIPTION_FIELD],
      }));

    const community = {
      avatar: values[COMM_AVATAR_FIELD],
      name: values[COMM_NAME_FIELD],
      language: values[LANGUAGE_FIELD]
        ? values[LANGUAGE_FIELD].value
        : DEFAULT_LOCALE,
      description: values[COMM_SHORT_DESCRIPTION_FIELD],
      main_description: values[COMM_MAIN_DESCRIPTION_FIELD],
      tags,
    };

    this.props.createCommunityDispatch(community, reset);
  };

  render() /* istanbul ignore next */ {
    const sendProps = {
      createCommunity: this.createCommunity,
      createCommunityLoading: this.props.createCommunityLoading,
      translations: translationMessages[this.props.locale],
    };

    const path = window.location.pathname + window.location.hash;

    return (
      <div>
        <Seo
          title={sendProps.translations[messages.title.id]}
          description={sendProps.translations[messages.description.id]}
          language={this.props.locale}
          index={false}
        />

        <Header />

        {path === createCommunityRoute && (
          <TipsBase className="overflow-hidden">
            <Form {...sendProps} />
            <Tips faqQuestions={this.props.faqQuestions} />
          </TipsBase>
        )}

        {path !== createCommunityRoute && <Banner />}
      </div>
    );
  }
}

CreateCommunity.propTypes = {
  setDefaultStoreDispatch: PropTypes.func.isRequired,
  createCommunityDispatch: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  createCommunityLoading: PropTypes.bool.isRequired,
  faqQuestions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  faqQuestions: selectFaqQuestions([
    WHAT_IS_COMMUNITY_QUESTION,
    WHO_MANAGES_COMMUNITY_QUESTION,
  ]),
  createCommunityLoading: selectors.selectCreateCommunityLoading(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    createCommunityDispatch: bindActionCreators(createCommunity, dispatch),
    setDefaultStoreDispatch: bindActionCreators(setDefaultStore, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'createCommunity', reducer });
const withSaga = injectSaga({ key: 'createCommunity', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CreateCommunity);
