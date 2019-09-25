import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';
import searchIcon from 'images/searchIcon.svg?inline';

import H3 from 'components/H3';
import Header from 'components/Header/Simple';
import Base from 'components/Base/BaseRounded';
import { MediumImageStyled } from 'components/Img/MediumImage';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

const rootId = 'search-root-id';

const BaseStyled = Base.extend`
  overflow: hidden;

  form {
    max-width: 320px;
  }

  .gsc-above-wrapper-area {
    display: flex;
    align-items: center;
    margin: 20px 0;
  }

  .gsc-orderby-container {
    display: none;
  }

  .gcsc-find-more-on-google-root {
    margin: 20px 0;
  }

  .gcsc-more-maybe-branding-root {
    margin-top: 20px;
  }

  @media only screen and (max-width: 576px) {
    padding: 0;
  }
`;

class Search extends React.PureComponent {
  state = {
    isScriptLoaded: false,
  };

  componentDidMount() {
    const cx = process.env.GOOGLE_SEARCH_FORM_ID;
    const gcse = document.createElement('script');

    gcse.onload = () => this.setState({ isScriptLoaded: true });
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = `https://cse.google.com/cse.js?cx=${cx}`;

    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  }

  componentWillUnmout() {
    document.getElementById(rootId).remove();
  }

  render() {
    return (
      <div id={rootId}>
        <Header className="mb-to-sm-0 mb-from-sm-3">
          <H3>
            <MediumImageStyled src={searchIcon} alt="search" />
            <FormattedMessage {...messages.search} />
          </H3>
        </Header>

        <BaseStyled>
          {!this.state.isScriptLoaded && <LoadingIndicator />}
          <div className="gcse-search" />
        </BaseStyled>
      </div>
    );
  }
}

export default Search;
