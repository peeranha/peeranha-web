import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import Tags from 'containers/Tags';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class TagsOfCommunity extends React.Component {
  render() {
    const { locale, match } = this.props;

    return (
      <div>
        <Helmet>
          <title>{translationMessages[locale][messages.title.id]}</title>
          <meta
            name="description"
            content={translationMessages[locale][messages.description.id]}
          />
        </Helmet>

        <Tags communityId={match.params.communityid}>Tags of community</Tags>
      </div>
    );
  }
}

TagsOfCommunity.propTypes = {
  locale: PropTypes.string.isRequired,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagsOfCommunity);
