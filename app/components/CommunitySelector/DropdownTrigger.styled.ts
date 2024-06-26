import { BORDER_PRIMARY, BORDER_RADIUS_S, TEXT_PRIMARY } from 'style-constants';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

export const styles = {
  container: {
    cursor: 'pointer',
    width: '100%',
    height: 'auto !important',
    background: graphCommunity ? '#161425' : 'linear-gradient(0deg, #FFFFFF, #FFFFFF), #D8D8D8',
    border: `1px solid ${graphCommunity ? '#3D3D54' : '#C2C6D8'}`,
    borderRadius: '3px',
    padding: '0 16px',
    minHeight: '44px',
  },

  placeholder: {
    color: graphCommunity ? '#E1E1E4' : 'rgb(123,123,123)',
  },

  arrow: {
    color: colors.linkColor || TEXT_PRIMARY,
    width: '18px',
    height: '18px',
    transition: 'transform 0.5s',
    margin: '0 0 0 16px',
  },

  language: {
    color: colors.tagColor || TEXT_PRIMARY,
    padding: '2px 8px',
    margin: '9px 16px 9px 0',
    border: `1px solid ${colors.tagColor || BORDER_PRIMARY}`,
    borderRadius: BORDER_RADIUS_S,
    zIndex: 200,
  },

  closeIcon: {
    margin: '0 0 0 4px',
  },
};
