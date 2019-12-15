/* eslint indent: 0, consistent-return: 0 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { translationMessages } from 'i18n';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import commonMessages from 'common-messages';
import searchIcon from 'images/searchIcon.svg?inline';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import H3 from 'components/H3';
import Seo from 'components/Seo';
import Header from 'components/Header/Simple';
import Base from 'components/Base/BaseRounded';
import { MediumImageStyled } from 'components/Img/MediumImage';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import reducer from './reducer';
import saga from './saga';

import { selectItems, selectGetResultsProcessing } from './selectors';
import { getResults } from './actions';
import Item from './Item';

import messages from './messages';

class Search extends React.PureComponent {
  componentDidMount() {
    this.search();
  }

  componentDidUpdate(prevProps) {
    this.search(prevProps.match.params.q);
  }

  search = prevQuery => {
    const currentQuery = this.props.match.params.q;

    if (prevQuery === currentQuery) {
      return null;
    }

    this.props.getResultsDispatch(currentQuery);
  };

  render() {
    const { getResultsProcessing, items, locale } = this.props;

    return (
      <div>
        <Seo
          title={translationMessages[locale][messages.title.id]}
          description={translationMessages[locale][messages.description.id]}
          language={locale}
          index={false}
        />

        <Header className="mb-to-sm-0 mb-from-sm-3">
          <H3>
            <MediumImageStyled src={searchIcon} alt="search" />
            <FormattedMessage {...commonMessages.search} />
          </H3>
        </Header>

        <Base>
          <ul>{items.map(x => <Item {...x} />)}</ul>

          <div>
            {getResultsProcessing && <LoadingIndicator />}
            {!getResultsProcessing &&
              !items.length && (
                <FormattedMessage {...commonMessages.noResults} />
              )}
          </div>
        </Base>
      </div>
    );
  }
}

Search.propTypes = {
  items: PropTypes.array,
  getResultsDispatch: PropTypes.func,
  match: PropTypes.object,
  getResultsProcessing: PropTypes.bool,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  items: selectItems(),
  getResultsProcessing: selectGetResultsProcessing(),
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getResultsDispatch: bindActionCreators(getResults, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'search', reducer });
const withSaga = injectSaga({ key: 'search', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Search);
