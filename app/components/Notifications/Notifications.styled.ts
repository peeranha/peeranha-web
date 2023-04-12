import {
  BG_SECONDARY_SPECIAL_4,
  BORDER_PRIMARY_LIGHT,
  BORDER_SECONDARY_LIGHT,
  TEXT_SECONDARY,
} from 'style-constants';

const styles = {
  containerStyles: {
    position: 'absolute',
    padding: '0 18px',
    fontSize: '16px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderBottom: `1px solid ${BORDER_SECONDARY_LIGHT}`,
    alignItems: 'start',
    justifyContent: 'center',
    '> *': {
      marginBottom: '4px',
    },
    '@media only screen and (min-width: 819px) and (max-width: 993px), only screen and (min-width: 1095px)':
      {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '1.35fr 1.45fr 0.55fr',
        padding: '0 36px',
      },
  },
  unreadStyles: {
    borderLeft: `3px solid ${BORDER_PRIMARY_LIGHT}`,
    background: BG_SECONDARY_SPECIAL_4,
  },
  timeStyles: {
    color: TEXT_SECONDARY,
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
  linkStyles: {
    display: 'flex',
    alignItems: 'center',
    '> span': {
      marginLeft: '5px',
    },
  },
};

export default styles;
