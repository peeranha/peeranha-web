import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TEXT_PRIMARY } from 'style-constants';

import { formatStringToHtmlId } from 'utils/animation';

import { IconLg } from 'components/Icon/IconWithSizes';

import Label from './Label';
import WarningMessage from './WarningMessage';

const CL = 350;
const ICON_LABEL_WIDTH = 24;
const ICON_LABEL_MARGIN = 10;
const ICON_LABEL_FULL_WIDTH = ICON_LABEL_WIDTH + ICON_LABEL_MARGIN;

const StyledBox = styled.div`
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  max-width: 100%;
  margin-bottom: ${x => (!x.insideOfSection ? '15px' : '10px')};

  ${Label} {
    width: 100%;
  }

  .fill {
    fill: ${TEXT_PRIMARY};
  }

  ${x =>
    x.disabled
      ? `:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    cursor: not-allowed;
  }`
      : ``};
`;

export const InputContainer = styled.div``;

const IconLabel = styled.span`
  align-self: center;
  margin-right: ${ICON_LABEL_MARGIN}px;
`;

const Body = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: ${x => (x.splitInHalf ? 'center' : 'initial')};
  flex-direction: ${x => (x.splitInHalf ? 'row' : 'column')};
  flex-grow: 1;
  max-width: 100%;
  -webkit-flex: 1 1;

  > div:nth-child(1) {
    flex: 0 0;
    max-width: ${x =>
      x.splitInHalf
        ? `${x.withIconLabel ? CL - ICON_LABEL_FULL_WIDTH : CL}px`
        : `100%`};
  }

  > div:nth-child(2) {
    flex: 0 0 ${x => (x.splitInHalf ? `calc(100% - ${CL}px)` : `100%`)};
    max-width: ${x => (x.splitInHalf ? `calc(100% - ${CL}px)` : `100%`)};
    padding-left: ${x => (x.splitInHalf ? '30px' : '0px')};
    margin-top: ${x => (x.splitInHalf ? '0px' : '8px')};
    -webkit-flex: 1 1 ${x => (x.splitInHalf ? `calc(100% - ${CL}px)` : `100%`)};
  }

  @media only screen and (max-width: 768px) {
    align-items: initial;
    flex-wrap: nowrap;
    flex-direction: column;
    -webkit-flex: 1 1 100%;

    > div:nth-child(1) {
      flex: 0 0 100%;
      max-width: 100%;
      -webkit-flex: 1 1 100%;
    }

    > div:nth-child(2) {
      flex: 0 0 100%;
      max-width: 100%;
      padding-left: 0px;
      margin-top: 8px;
      -webkit-flex: 1 1 100%;
    }
  }
`;

export const Wrapper = ({
  children,
  tip,
  label,
  meta,
  splitInHalf,
  disabled,
  id,
  insideOfSection,
  className,
  iconLabel,
  isShowLabel = true,
}) => (
  <StyledBox
    className={className}
    disabled={disabled}
    id={formatStringToHtmlId(id)}
    insideOfSection={insideOfSection}
  >
    {isShowLabel && <Label>{label}</Label>}
    {iconLabel && (
      <IconLabel>
        <IconLg icon={iconLabel} />
      </IconLabel>
    )}
    <Body splitInHalf={splitInHalf} withIconLabel={!!iconLabel}>
      <InputContainer>{children}</InputContainer>
      {meta && (
        <WarningMessage
          {...meta}
          containerIsSplittedInHalf={splitInHalf}
          tip={tip}
        />
      )}
    </Body>
  </StyledBox>
);

Wrapper.propTypes = {
  children: PropTypes.any,
  tip: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  meta: PropTypes.object,
  splitInHalf: PropTypes.bool,
  disabled: PropTypes.bool,
  insideOfSection: PropTypes.bool,
  iconLabel: PropTypes.string,
  isShowLabel: PropTypes.bool,
};

export default React.memo(Wrapper);
