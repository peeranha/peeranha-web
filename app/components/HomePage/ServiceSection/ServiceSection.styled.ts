export const styles = {
  container: {
    background:
      'radial-gradient(97.64% 49.44% at 26.39% 52.51%, #A5BCFF 0%, #7692F6 100%)',
  },

  wrapper: {
    paddingBottom: '40px',

    '@media (min-width: 768px)': {
      paddingBottom: '56px',
    },

    '@media (min-width: 1024px)': {
      paddingBottom: '64px',
    },

    '@media (min-width: 1366px)': {
      paddingBottom: '80px',
    },

    '@media (min-width: 1920px)': {
      paddingBottom: '90px',
    },
  },

  title: {
    width: '328px',
    height: '96px',
    marginTop: '-40px',
    background: 'rgb(255, 255, 255)',
    border: '2px solid rgb(255, 255, 255)',
    backdropFilter: 'blur(15px)',
    borderRadius: '80px',
    marginBottom: '40px',
    lineHeight: '100%',
    color: 'rgb(165, 188, 255)',
    padding: '0 20px',

    '@media (min-width: 768px)': {
      width: '510px',
      height: '68px',
      marginBottom: '43px',
      marginTop: '-25px',
    },

    '@media (min-width: 1024px)': {
      width: '651px',
      height: '72px',
      fontSize: '32px',
      padding: '0',
      marginBottom: '63px',
    },

    '@media (min-width: 1366px)': {
      width: '733px',
      height: '80px',
      fontSize: '40px',
      padding: '0',
      marginBottom: '77px',
      marginTop: '-30px',
    },

    '@media (min-width: 1920px)': {
      width: '1049px',
      height: '122px',
      fontSize: '58px',
      padding: '0',
      marginBottom: '93px',
    },
  },

  content: {
    marginBottom: '24px',

    '@media (min-width: 768px)': {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      columnGap: '24px',
    },
  },

  contentBlock: {
    display: 'flex',
    marginBottom: '16px',

    '@media (min-width: 768px)': {
      marginBottom: '24px',
      paddingRight: '16px',
    },

    '@media (min-width: 1024px)': {
      marginBottom: '40px',
      paddingRight: '24px',
    },

    '@media (min-width: 1920px)': {
      marginBottom: '51px',
    },
  },

  image: {
    display: 'flex',
    width: '40px',
    height: '40px',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    padding: '8px',
    marginRight: '16px',

    '@media (min-width: 1024px)': {
      width: '48px',
      height: '48px',
    },
  },

  header: {
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '130%',
    color: 'rgb(255, 255, 255)',
    marginBottom: '4px',

    '@media (min-width: 1024px)': {
      fontSize: '22px',
      marginBottom: '8px',
    },

    '@media (min-width: 1920px)': {
      fontSize: '28px',
      marginBottom: '12px',
    },
  },

  text: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '150%',
    color: 'rgb(255, 255, 255)',

    '@media (min-width: 1024px)': {
      fontSize: '16px',
    },

    '@media (min-width: 1920px)': {
      fontSize: '22px',
    },
  },

  button: {
    width: '190px',
    height: '40px',
    background: 'rgb(247, 111, 96)',
    border: '2px solid rgb(255, 255, 255)',
    borderRadius: '5px',
    lineHeight: '25px',
    color: 'rgb(255, 255, 255)',

    '@media (min-width: 1366px)': {
      width: '256px',
      height: '56px',
      fontSize: '28px',
      lineHeight: '35px',
    },
  },
};
