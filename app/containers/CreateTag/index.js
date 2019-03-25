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

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { suggestTag } from './actions';

import { NAME_FIELD, DESCRIPTION_FIELD } from './constants';

import CreateTagForm from './CreateTagForm';

/* eslint-disable react/prefer-stateless-function */
export class CreateTag extends React.Component {
  createTag = (...args) => {
    const { reset } = args[2];
    const tag = {
      name: args[0].get(NAME_FIELD),
      description: args[0].get(DESCRIPTION_FIELD),
      communityid: this.props.match.params.communityid,
    };

    this.props.suggestTagDispatch(tag, reset);
  };

  render() {
    const { locale, createTagLoading } = this.props;

    return (
      <div className="container">
        <Helmet>
          <title>{translationMessages[locale][messages.title.id]}</title>
          <meta
            name="description"
            content={translationMessages[locale][messages.description.id]}
          />
        </Helmet>

        <CreateTagForm
          createTagLoading={createTagLoading}
          createTag={this.createTag}
          translations={translationMessages[locale]}
        />
      </div>
    );
  }
}

CreateTag.propTypes = {
  locale: PropTypes.string,
  match: PropTypes.object,
  createTagLoading: PropTypes.bool,
  suggestTagDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
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
