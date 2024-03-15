/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

import {
  BORDER_SECONDARY,
  BG_LIGHT,
  SECONDARY_SPECIAL_2,
  BORDER_PRIMARY,
  BORDER_PRIMARY_RGB,
  BORDER_PREMIUM,
  BORDER_PREMIUM_RGB,
  BORDER_RADIUS_L,
  BORDER_TUTORIAL,
} from 'style-constants';
import { graphCommunityColors } from 'utils/communityManagement';

const graphCommunity = graphCommunityColors();

const borderTopLeftRadius = ({ bordered, topRightRadius, withoutBR }) =>
  (bordered || topRightRadius) && !withoutBR ? BORDER_RADIUS_L : 'none';

const borderTopRightRadius = ({ bordered, bottomRightRadius, withoutBR }) =>
  (bordered || bottomRightRadius) && !withoutBR ? BORDER_RADIUS_L : 'none';

const borderForTutorial = (isTutorial) =>
  isTutorial ? (graphCommunity ? '#4BCA81' : BORDER_TUTORIAL) : BORDER_PRIMARY;

const Base = styled.div`
  background: ${graphCommunity ? '#161425' : BG_LIGHT};
  padding: 20px 30px;
  flex-grow: 1;
  padding-top: ${({ paddingTop }) => paddingTop || 20}px;
  padding-bottom: ${({ paddingBottom }) => paddingBottom || 30}px;

  overflow: ${({ overflowHidden }) => (overflowHidden ? 'hidden' : 'initial')};
  border: ${({ bordered, isPromoted, isTutorial }) =>
    bordered || isPromoted
      ? `1px solid ${isPromoted ? BORDER_PREMIUM : borderForTutorial(isTutorial)} !important`
      : '0'};
  box-shadow: ${({ bordered, position, isPromoted }) =>
    (bordered || isPromoted) && !position
      ? `0 0 0 1px rgba(${isPromoted ? BORDER_PREMIUM_RGB : BORDER_PRIMARY_RGB}, 0.4) !important`
      : `none`};
  border-top-left-radius: ${({ bordered, topRightRadius, withoutBR }) =>
    (bordered || topRightRadius) && !withoutBR ? BORDER_RADIUS_L : 'none'};
  border-bottom-left-radius: ${({ bordered, bottomRightRadius, withoutBR }) =>
    (bordered || bottomRightRadius) && !withoutBR ? BORDER_RADIUS_L : 'none'};

  @media only screen and (max-width: 768px) {
    border-top-left-radius: ${borderTopLeftRadius};
    border-top-right-radius: ${borderTopRightRadius};
    border-bottom-left-radius: 0;
  }

  @media only screen and (max-width: 576px) {
    padding: ${({ nullMobilePadding }) => (nullMobilePadding ? '0px' : '15px')};
    ${({ paddingTopMedia }) => `padding-top: ${paddingTopMedia}px`};
    border-radius: 0;
  }

  ${(x) =>
    x.position === 'top'
      ? `border-top-left-radius: ${BORDER_RADIUS_L}; border-top-right-radius: ${BORDER_RADIUS_L}; border-bottom: 1px solid ${BORDER_SECONDARY};`
      : ''}

  ${(x) =>
    x.position === 'bottom'
      ? `border-bottom-left-radius: ${BORDER_RADIUS_L}; border-bottom-right-radius: ${BORDER_RADIUS_L}; box-shadow: 0 2px 2px 0 ${SECONDARY_SPECIAL_2};`
      : ''}

  ${(x) =>
    x.position === 'left'
      ? `border-top-left-radius: ${BORDER_RADIUS_L}; border-bottom-left-radius: ${BORDER_RADIUS_L}; box-shadow: 0 2px 2px 0 ${SECONDARY_SPECIAL_2}; border-right: 1px solid ${BORDER_SECONDARY};`
      : ''}

  ${(x) =>
    x.position === 'right'
      ? `border-top-right-radius: ${BORDER_RADIUS_L}; border-bottom-right-radius: ${BORDER_RADIUS_L}; box-shadow: 0 2px 2px 0 ${SECONDARY_SPECIAL_2};`
      : ''}

  ${(x) => (x.position === 'middle' ? `border-bottom: none;` : '')}
`;

export default Base;
