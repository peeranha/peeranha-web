import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DescriptionList from 'components/DescriptionList';
import { BG_LIGHT, BORDER_PRIMARY_LIGHT, TEXT_DARK, TEXT_PRIMARY } from 'style-constants';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

const Base = styled.div`
  position: absolute;
  background-color: ${colors.tooltipBackgroundColor || BG_LIGHT};
  z-index: 100;
  right: 0;
  top: 25px;
  border-radius: 5px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  padding: 15px;
  text-align: left;

  white-space: nowrap;
  span {
    color: ${colors.tooltipSecondaryColor || TEXT_DARK};
  }

  strong {
    display: inline-block;
    margin-bottom: 10px;
    font-weight: 900;
    color: ${colors.tooltipColor || TEXT_PRIMARY};
  }

  > ul {
    li {
      color: ${TEXT_DARK};
      margin-left: 15px;
    }

    li::before {
      content: '\\2022';
      color: ${BORDER_PRIMARY_LIGHT};
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }
`;

const Popover = ({ title, label, items, isSearch, right, width }) => {
  const { t } = useTranslation();

  return (
    <Base
      css={css`
        ${isSearch && '@media (max-width: 991px) {left: 0px !important;}'}
        ${width && `width: ${width}px; white-space: normal !important;`}
        right: ${right}px
      `}
    >
      {title && <strong>{t(title)}</strong>}
      <DescriptionList label={label} items={items} />
    </Base>
  );
};

Popover.propTypes = {
  locale: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.string,
  width: PropTypes.string,
};

export default memo(Popover);
