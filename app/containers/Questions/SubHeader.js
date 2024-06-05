/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import createdHistory from 'createdHistory';
import { BG_TRANSPARENT, BG_PRIMARY } from 'style-constants';

import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

import { ANSWERS_TYPES } from './constants';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();
const linkColor = colors.linkColor || BG_PRIMARY;

export const SubHeader = ({ filterTabByAnswers, setFilterTabByAnswers }) => {
  const { t } = useTranslation();
  const { location } = createdHistory;

  const setActiveFilterTabByAnswers = (type) => {
    setFilterTabByAnswers(type);
    if (window.location.search.slice(0, 6) === '?page=') {
      createdHistory.push(location.pathname);
    }
  };
  return (
    <>
      <div
        css={{
          whiteSpace: 'nowrap',
          marginBottom: '10px',
          marginTop: '10px',
          maxWidth: '100%',
          scrollbarWidth: 'auto',
          overflow: 'auto',
          height: '100%',
          '@media (min-width: 576px)': {
            marginTop: 0,
          },
          '::-webkit-scrollbar': {
            height: '4px',
            backgroundColor: 'transparent',
          },

          '::-webkit-scrollbar-thumb': {
            backgroundColor: graphCommunity ? '#6F4CFF' : 'rgba(53, 74, 137, 0.25)',
            borderRadius: '4px',
          },
        }}
      >
        {ANSWERS_TYPES.map((type, index) => (
          <button
            key={type.id}
            css={{
              width: 'min-content',
              height: '30px',
              borderRadius: '3px',
              marginRight: '16px',
              padding: '5px 10px',
              backgroundColor:
                filterTabByAnswers?.name === type.name ||
                (filterTabByAnswers === null && index === 0)
                  ? graphCommunity
                    ? 'rgba(111, 76, 255, 1)'
                    : linkColor
                  : BG_TRANSPARENT,
              color:
                filterTabByAnswers?.name === type.name ||
                (filterTabByAnswers === null && index === 0)
                  ? 'rgba(255, 255, 255, 1)'
                  : graphCommunity
                  ? 'rgba(111, 76, 255, 1)'
                  : linkColor,
              marginBottom: '5px',
              ':last-child': {
                marginRight: 0,
              },
            }}
            onClick={() => setActiveFilterTabByAnswers(type)}
          >
            {t(`post.${type.name}`)}
          </button>
        ))}
      </div>
    </>
  );
};

SubHeader.propTypes = {
  filterTabByAnswers: PropTypes.bool,
  setFilterTabByAnswers: PropTypes.func,
};

export default React.memo(SubHeader);
