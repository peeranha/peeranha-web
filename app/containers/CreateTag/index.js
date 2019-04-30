/**
 *
 * CreateCommunity
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Base from 'components/Base/BaseRounded';
import BaseTransparent from 'components/Base/BaseTransparent';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

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
      communityId: args[0].get(FORM_COMMUNITY).id,
    };

    this.props.suggestTagDispatch(tag, reset);
  };

  render() {
    const { locale, createTagLoading, communities, match } = this.props;

    return (
      <div>
        <Helmet>
          <title>{translationMessages[locale][messages.title.id]}</title>
          <meta
            name="description"
            content={translationMessages[locale][messages.description.id]}
          />
        </Helmet>

        <Header />

        {communities[0] && (
          <Base className="p-0">
            <div className="d-flex">
              <div className="col-12 col-xl-9 p-0">
                <BaseTransparent>
                  <Form
                    communityId={+match.params.communityid}
                    communities={communities}
                    createTagLoading={createTagLoading}
                    createTag={this.createTag}
                    translations={translationMessages[locale]}
                  />
                </BaseTransparent>
              </div>

              <div className="col-12 col-xl-3 p-0">
                <Tips />
              </div>
            </div>
          </Base>
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
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  communities: selectCommunities(),
  createTagLoading: selectors.selectSuggestTagLoading(),
});

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    suggestTagDispatch: (tag, reset) => dispatch(suggestTag(tag, reset)),
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
