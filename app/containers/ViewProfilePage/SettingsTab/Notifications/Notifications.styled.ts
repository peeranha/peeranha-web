import { singleCommunityColors } from 'utils/communityManagement';
import { TEXT_SECONDARY } from 'style-constants';

const colors = singleCommunityColors();

export const styles = {
  line: {
    height: '1px',
    background: '#C2C6D8',
    margin: '25px 0',
  },
  fontSize: {
    fontSize: '18px',
  },
  width: {
    maxWidth: '450px',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '36px  0 12px 0',
    maxWidth: '450px',
    fontSize: '18px',
  },
  secondaryText: {
    fontSize: '16px',
    color: TEXT_SECONDARY,
  },
  emailNotifications: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '5px',
    'div:first-child': {
      width: '100%',
      marginBottom: '5px',
      fontWeight: 600,
    },
  },
  confirmedEmail: {
    fontWeight: 600,
    'div:first-child': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '5px',
      span: {
        color: TEXT_SECONDARY,
        fontWeight: 400,
      },
    },
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    '> div': {
      width: '100%',
    },
  },

  // checkEmail: {
  //   fontSize: '14px',
  //                         width: '100%',
  //                         marginBottom: '10px',
  //                         color: '#F76F60',
  //                         fontStyle: 'italic',
  // },
  // inputEmail: {
  //   input: {
  //       border: '1px solid #F76F60',
  //   boxShadow: '0 0 0 3px rgba(252,102,85,0.40)'
  //   },
  //   'input:focus': {
  //     border: '1px solid #F76F60',
  //     boxShadow: '0 0 0 3px rgba(252,102,85,0.40)',
  //   },
  // },
  cancelButton: {
    border: '1px solid #F76F60',
    width: '86px',
    height: '40px',
    fontSize: '16px',
    color: '#F76F60',
    marginRight: '12px',
    borderRadius: '2px',
  },
  profileEmail: {
    marginBottom: '5px',
    fontWeight: 600,
  },
};
