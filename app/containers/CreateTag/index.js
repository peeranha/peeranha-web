/**
 *
 * CreateCommunity
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Seo from 'components/Seo';
import TipsBase from 'components/Base/TipsBase';
import { BaseSpecialOne } from 'components/Base/BaseTransparent';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import {
  selectCommunities,
  selectFaqQuestions,
} from 'containers/DataCacheProvider/selectors';

import {
  WHAT_IS_TAG_QUESTION,
  HOW_TO_USE_IT_QUESTION,
} from 'containers/Faq/constants';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { suggestTag } from './actions';

import { NAME_FIELD, DESCRIPTION_FIELD, FORM_COMMUNITY } from './constants';

import Form from './Form';
import Tips from './Tips';
import Header from './Header';

/* eslint-disable react/prefer-stateless-function */
export class CreateTag extends React.PureComponent {
  createTag = (...args) => {
    const { reset } = args[2];

    const tag = {
      name: args[0].get(NAME_FIELD),
      description: args[0].get(DESCRIPTION_FIELD),
      communityId: Number(
        args[0].get(FORM_COMMUNITY).id || this.props.match.params.communityid,
      ),
    };

    this.props.suggestTagDispatch(tag, reset);
  };

  render() /* istanbul ignore next */ {
    const {
      locale,
      createTagLoading,
      communities,
      match,
      faqQuestions,
    } = this.props;

    return (
      <div>
        <Seo
          title={translationMessages[locale][messages.title.id]}
          description={translationMessages[locale][messages.description.id]}
          language={locale}
          index={false}
        />

        <Header />

        {communities[0] && (
          <TipsBase className="overflow-hidden">
            <BaseSpecialOne>
              <Form
                communityId={+match.params.communityid}
                communities={communities}
                createTagLoading={createTagLoading}
                createTag={this.createTag}
                translations={translationMessages[locale]}
              />
            </BaseSpecialOne>

            <Tips faqQuestions={faqQuestions} />
          </TipsBase>
        )}

        {!communities.length && <LoadingIndicator />}
      </div>
    );
  }
}

CreateTag.propTypes = {
  locale: PropTypes.string,
  match: PropTypes.object,
  createTagLoading: PropTypes.bool,
  suggestTagDispatch: PropTypes.func,
  communities: PropTypes.array,
  faqQuestions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  faqQuestions: selectFaqQuestions([
    WHAT_IS_TAG_QUESTION,
    HOW_TO_USE_IT_QUESTION,
  ]),
  communities: selectCommunities(),
  createTagLoading: selectors.selectSuggestTagLoading(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    suggestTagDispatch: bindActionCreators(suggestTag, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'createTag', reducer });
const withSaga = injectSaga({ key: 'createTag', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CreateTag);
