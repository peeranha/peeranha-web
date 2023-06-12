import { hexToRgbaString } from 'utils/converters';
import { PEER_PRIMARY_COLOR } from 'style-constants';

export const styles = {
  container: {
    display: 'flex',
    flexShrink: 0,
  },

  botImageWrapper: {
    marginRight: '8px',
    position: 'relative',
    width: '42px',
    height: '42px',
  },

  botImage: {
    padding: '1px',

    width: '42px',
    height: '42px',

    borderRadius: '50%',
    border: `2.5px solid ${hexToRgbaString(PEER_PRIMARY_COLOR, 0.4)}`,

    objectFit: 'scale-down',
    display: 'inline-block',
  },

  messengerImage: {
    position: 'absolute',
    bottom: '-2px',
    right: '-2px',

    width: '14.7px',
    height: '14.7px',

    borderRadius: '50%',
    border: `1.5px solid ${hexToRgbaString(PEER_PRIMARY_COLOR, 0.4)}`,

    background: 'white',
    boxSizing: 'content-box',
  },
};
