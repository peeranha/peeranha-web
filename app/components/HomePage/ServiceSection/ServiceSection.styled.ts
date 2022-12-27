import bg from 'images/background_service_figure.png';
import fish from 'images/fish.svg?inline';
import rightBottomCoin from 'images/right-bottom-coin.svg?inline';
import leftBottomCoin from 'images/left-bottom-coin.svg?inline';
import topCoin from 'images/top-coin.svg?inline';

export const styles = {
  backgroundImage: {
    backgroundImage: `url(${bg})`,
    backgroundPositionY: '119px',
    backgroundPositionX: '-701px',
    backgroundSize: '490% 100%',

    '@media (min-width: 768px)': {
      backgroundPositionY: '7px',
      backgroundPositionX: '-401px',
      backgroundSize: '210% 100%',
    },

    '@media (min-width: 1024px)': {
      backgroundPositionY: '70px',
      backgroundPositionX: '-204px',
      backgroundSize: '140% 90%',
    },

    '@media (min-width: 1366px)': {
      backgroundPositionY: '50px',
      backgroundPositionX: '-1px',
      backgroundSize: '100% 92%',
    },

    '@media (min-width: 1920px)': {
      backgroundPositionY: '4px',
      backgroundPositionX: '0px',
      backgroundSize: '101% 100%',
    },
  },
  fishImage: {
    backgroundImage: `url(${fish})`,
    backgroundPositionX: '100%',
    backgroundPositionY: '57px',
    backgroundSize: '40px',

    '@media (min-width: 768px)': {
      backgroundPositionX: '95%',
      backgroundPositionY: '32px',
      backgroundSize: '40px',
    },

    '@media (min-width: 1366px)': {
      backgroundSize: '65px',
    },

    '@media (min-width: 1920px)': {
      backgroundPositionY: '102px',
    },
  },

  rightBottomCoinImage: {
    backgroundImage: `url(${rightBottomCoin}) `,
    backgroundSize: '65px',
    backgroundPosition: '100% 105%',

    '@media (min-width: 768px)': {
      backgroundPosition: '85% 103%',
    },

    '@media (min-width: 1024px)': {
      backgroundSize: '107px',
    },

    '@media (min-width: 1366px)': {
      backgroundPosition: '92% 105%',
    },

    '@media (min-width: 1920px)': {
      backgroundSize: '140px',
      backgroundPosition: '90% 105%',
    },
  },
  leftBottomCoinImage: {
    backgroundImage: `url(${leftBottomCoin})`,
    backgroundSize: '29px',
    backgroundPosition: '-9px 95%',

    '@media (min-width: 768px)': {
      backgroundPosition: '-7px 11%',
    },

    '@media (min-width: 1024px)': {
      backgroundSize: '48px',
      backgroundPosition: '-12px 12%',
    },

    '@media (min-width: 1920px)': {
      backgroundSize: '62px',
      backgroundPosition: '-12px 18%',
    },
  },
  rightTopCoinImage: {
    transform: 'scaleX(-1)',
    backgroundImage: `url(${topCoin})`,
    backgroundSize: '29px',
    backgroundPosition: '-13px 92%',

    '@media (min-width: 768px)': {
      backgroundPosition: '6% 86%',
    },

    '@media (min-width: 1024px)': {
      backgroundPosition: '7% 84%',
      backgroundSize: '48px',
    },

    '@media (min-width: 1366px)': {
      backgroundPosition: '5% 78%',
    },

    '@media (min-width: 1920px)': {
      backgroundPosition: '6% 79%',
      backgroundSize: '62px',
    },
  },
  leftTopCoinImage: {
    backgroundImage: `url(${topCoin})`,
    backgroundSize: '50px',
    backgroundPosition: '-6px 88%',

    '@media (min-width: 768px)': {
      backgroundPosition: '7% 4%',
    },

    '@media (min-width: 1024px)': {
      backgroundSize: '81px',
    },

    '@media (min-width: 1920px)': {
      backgroundPosition: '7% 8%',
      backgroundSize: '107px',
    },
  },

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
    padding: '0 25px',

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
    zIndex: 99,
    transition: '0.4s',

    ':hover': {
      opacity: 0.8,
    },

    '@media (min-width: 1366px)': {
      width: '256px',
      height: '56px',
      fontSize: '28px',
      lineHeight: '35px',
    },
  },

  fishAnimation: {
    animation: 'fishAnimation 1s forwards',
    opacity: 0,

    '@keyframes fishAnimation': {
      '0%': {
        transform: 'translateX(40px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },
  },
  rightBottomCoinAnimation: {
    animation: 'rightBottomAnimation 1s forwards',
    animationDelay: '0.2s',
    opacity: 0,

    '@keyframes rightBottomAnimation': {
      '0%': {
        transform: 'translateX(80px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },
  },
  leftTopCoinAnimation: {
    animation: 'leftTopAnimation 1s forwards',
    opacity: 0,

    '@keyframes leftTopAnimation': {
      '0%': {
        transform: 'translateX(-80px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0))',
        opacity: 1,
      },
    },
  },
  leftBottomCoinAnimation: {
    animation: 'leftBottomAnimation 1s forwards',
    animationDelay: '0.2s',
    opacity: 0,

    '@keyframes leftBottomAnimation': {
      '0%': {
        transform: 'translateX(-40px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0))',
        opacity: 1,
      },
    },
  },
  rightTopCoinAnimation: {
    animation: 'rightTopAnimation 1s forwards',
    opacity: 0,

    '@keyframes rightTopAnimation': {
      '0%': {
        transform: 'translateX(100%)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(calc(100%-40px))',
        opacity: 1,
      },
    },
  },
  startButtonAnimation: {
    animation: 'startButtonAnimation 1.2s forwards',
    opacity: 0,

    '@keyframes startButtonAnimation': {
      '0%': {
        transform: 'translateY(60px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: 1,
      },
    },
  },
  iconAnimation: {
    animation: 'iconAnimation 0.8s forwards',
    opacity: 0,

    '@keyframes iconAnimation': {
      '0%': {
        opacity: 0,
      },
      '100%': {
        opacity: 1,
      },
    },
  },
  titleAnimation: {
    animation: 'contentTitleAnimation 1.2s forwards',
    opacity: 0,

    '@keyframes contentTitleAnimation': {
      '0%': {
        transform: 'translateY(60px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: 1,
      },
    },
  },
  textAnimation: {
    animation: 'contentTitleAnimation 1.2s forwards',
    animationDelay: '0.4s',
    opacity: 0,

    '@keyframes contentTitleAnimation': {
      '0%': {
        transform: 'translateY(60px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: 1,
      },
    },
  },
  headerAnimation: {
    animation: 'contentTitleAnimation 1s forwards',
    opacity: 0,

    '@keyframes contentTitleAnimation': {
      '0%': {
        transform: 'translateY(40px)',
        opacity: 0,
        width: '96px',
        color: 'transparent',
      },
      '30%': {
        width: '96px',
        transform: 'translateY(0) scaleX(96px)',
        opacity: 1,
        color: 'transparent',
      },
      '80%': {
        transform: 'scale(100%)',
        opacity: 1,
        color: 'transparent',
      },
      '100%': {
        opacity: 1,
      },
    },
  },
};
