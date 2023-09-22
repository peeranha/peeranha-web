import React, { useState } from 'react';
import Seo from 'components/Seo';
import Header from 'components/Header/Simple';
import { css } from '@emotion/react';
import H3 from 'components/H3';
import { BG_LIGHT, BORDER_PRIMARY, ICON_TRASPARENT_BLUE } from 'style-constants';
import { MediumIconStyled } from 'components/Icon/MediumIcon';
import { IconLg } from 'components/Icon/IconWithSizes';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import AIIcon from 'images/aiIcon.svg?external';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { isSingleCommunityWebsite, singleCommunityColors } from 'utils/communityManagement';
import { styles } from 'containers/AISearch/AISearch.styled';
import { TrendingUp, Time, OutlinedBurger, SearchAI, Close } from 'components/icons';
import Button from 'components/common/Button';
import { getSearchResult } from './actions';

import reducer from './reducer';
import saga from './saga';

const colors = singleCommunityColors();
const single = isSingleCommunityWebsite();
const customColor = colors.linkColor || BORDER_PRIMARY;

const AISearch = ({ locale, getSearchResultDispatch }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <Seo
        title={'AI-Powered search'}
        description={'AI-Powered search'}
        language={locale}
        index={false}
      />

      <Header
        className="mb-to-sm-0 mb-from-sm-3 df fdc"
        css={css`
          align-items: baseline;
          padding-top: 30px;
          @media only screen and (max-width: 576px) {
            border: none;
          }
        `}
      >
        <H3>
          <div
            css={css`
              .fill {
                fill: ${customColor};
              }

              .stroke {
                stroke: ${customColor};
              }

              .semitransparent {
                fill: ${colors.transparentIconColor || ICON_TRASPARENT_BLUE};
              }
            `}
          >
            <MediumIconStyled>
              <IconLg icon={AIIcon} width={32} fill={BORDER_PRIMARY} />
            </MediumIconStyled>
          </div>
          AI-Powered search
        </H3>
        <div css={styles.headerSearchField}>
          <input
            type="text"
            css={styles.searchInput}
            placeholder={'Let the magic begin, Ask a question'}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.currentTarget.value);
            }}
          />
          {searchText ? (
            <Close
              fill={'#BDBDBD'}
              onClick={() => {
                setSearchText('');
              }}
              css={styles.closeInputIcon}
            />
          ) : (
            <SearchAI size={[30, 30]} stroke={'#BDBDBD'} css={styles.searchInputIcon} />
          )}
          <Button
            id="header-ask-question"
            onClick={() => {
              getSearchResultDispatch(searchText, single);
            }}
            css={css`
              position: absolute;
              top: 10px;
              right: 15px;

              .fill {
                fill: ${colors.newPostButtonText || BG_LIGHT};
              }

              .stroke {
                stroke: ${colors.newPostButtonText || BG_LIGHT};
              }

              span {
                display: flex;
                align-items: center;
              }

              background: ${colors.btnHeaderColor};

              :hover {
                background: ${colors.btnHeaderHoverColor};
                border: ${colors.btnHeaderHoverBorder};
                opacity: ${colors.btnHeaderHoverOpacity};
              }
            `}
          >
            <IconLg fill={colors.newPostButtonText || BG_LIGHT} icon={AIIcon} />
            <span
              className="ml-2"
              css={css`
                color: ${colors.newPostButtonText};
              `}
            >
              Ask AI
            </span>
          </Button>
        </div>
      </Header>
      <div css={styles.searchBlock}>
        <div css={styles.searchField}>
          <input
            type="text"
            css={styles.searchInput}
            placeholder={'Ask a question'}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.currentTarget.value);
            }}
          />
          {searchText ? (
            <Close
              fill={'#BDBDBD'}
              css={styles.closeInputIcon}
              onClick={() => {
                setSearchText('');
              }}
            />
          ) : (
            <SearchAI size={[30, 30]} stroke={'#BDBDBD'} css={styles.searchInputIcon} />
          )}
        </div>
        <Button
          id="header-ask-question"
          onClick={() => {
            getSearchResultDispatch(searchText, single);
          }}
          css={css`
            margin-top: 15px;

            .fill {
              fill: ${colors.newPostButtonText || BG_LIGHT};
            }

            .stroke {
              stroke: ${colors.newPostButtonText || BG_LIGHT};
            }

            span {
              display: flex;
              align-items: center;
            }

            background: ${colors.btnHeaderColor};

            :hover {
              background: ${colors.btnHeaderHoverColor};
              border: ${colors.btnHeaderHoverBorder};
              opacity: ${colors.btnHeaderHoverOpacity};
            }
          `}
        >
          <IconLg fill={colors.newPostButtonText || BG_LIGHT} icon={AIIcon} />
          <span
            className="ml-2"
            css={css`
              color: ${colors.newPostButtonText};
            `}
          >
            Ask AI
          </span>
        </Button>
      </div>
      <h3 css={styles.subTitle}>Explore your advanced AI search engine</h3>
      <div css={styles.additionalInfo}>
        <div css={styles.additionalInfoItem}>
          <MediumIconStyled>
            <Time stroke={customColor} />
          </MediumIconStyled>
          <h4 css={styles.additionalInfoItemTitle}>Time-efficiency</h4>
          <p css={styles.additionalInfoItemContent}>
            Unlock the potencial for swift data exploration and enjoy efficient results.
          </p>
        </div>
        <div css={styles.additionalInfoItem}>
          <MediumIconStyled>
            <OutlinedBurger stroke={customColor} />
          </MediumIconStyled>
          <h4 css={styles.additionalInfoItemTitle}>Broad knowledge base</h4>
          <p css={styles.additionalInfoItemContent}>
            Connect to our advanced AI search engine, honed from a vast array of sources. Tap into
            community support whenever you need it.
          </p>
        </div>
        <div css={styles.additionalInfoItem}>
          <MediumIconStyled>
            <TrendingUp stroke={customColor} />
          </MediumIconStyled>
          <h4 css={styles.additionalInfoItemTitle}>Continious improvement</h4>
          <p css={styles.additionalInfoItemContent}>
            Experience a stream of quality enhancements with our ongoing updates.
          </p>
        </div>
      </div>
    </>
  );
};

export default compose(
  injectReducer({ key: 'aiSearchReducer', reducer }),
  injectSaga({ key: 'aiSearchReducer', saga, mode: DAEMON }),
  connect(
    createStructuredSelector({
      locale: makeSelectLocale(),
    }),
    (dispatch) => ({
      getSearchResultDispatch: bindActionCreators(getSearchResult, dispatch),
    }),
  ),
)(AISearch);
