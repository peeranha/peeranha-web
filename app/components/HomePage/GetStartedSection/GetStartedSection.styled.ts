import manInstruments from 'images/top-man-instruments.svg?inline';
import manBackground from 'images/top-man-background.svg?inline';
import man from 'images/top-man.svg?inline';

export const styles = {
  background: {
    transformOrigin: 'center',
    top: '-2.5vw',
    left: '-1vh',
    width: '176.5vw',
    height: '210vw',
    backgroundImage: `url(${manBackground})`,
    backgroundSize: '176.5vw',
    backgroundPosition: '3.5vw 32vh',

    '@media (min-width: 574px)': {
      backgroundSize: '125.5vw',
      backgroundPosition: '17.5vw 26vh',
    },

    '@media (min-width: 768px)': {
      backgroundSize: '87.5vw',
      backgroundPosition: '50.5vw 7vh',
      height: '100vw',
    },

    '@media (min-width: 1366px)': {
      backgroundSize: '86.5vw',
      backgroundPosition: '52vw 14vh',
    },

    '@media (min-width: 1920px)': {
      backgroundSize: '58.5vw',
      backgroundPosition: '54vw 15vh',
      width: '110vw',
    },
  },

  instruments: {
    transformOrigin: 'center',
    top: '0.5vw',
    left: '-40vw',
    width: '176.5vw',
    height: '620px',

    backgroundImage: `url(${manInstruments})`,
    backgroundSize: '275px',
    backgroundPosition: 'center 33.5vh',

    '@media (min-width: 574px)': {
      backgroundPosition: 'center 28.5vh',
      width: '176.5vw',
      height: '620px',
    },

    '@media (min-width: 768px)': {
      backgroundPosition: '58.5vw 9.5vh',
      left: '0vw',
      width: '176.5vw',
      height: '400px',
    },

    '@media (min-width: 1024px)': {
      backgroundSize: '378px',
      backgroundPosition: '58vw 11.5vh',
      top: '-0.5vw',
      width: '176.5vw',
      height: '480px',
    },

    '@media (min-width: 1366px)': {
      backgroundSize: '481px',
      backgroundPosition: '60.5vw 16vh',
      top: '0.5vw',
      left: '0.5vw',
      width: '176.5vw',
      height: '610px',
    },
    '@media (min-width: 1920px)': {
      backgroundPosition: '60.5vw 16vh',
      left: '0vw',
      width: '176.5vw',
    },
  },

  man: {
    backgroundImage: `url(${man})`,
    backgroundSize: '255px',
    backgroundPosition: 'center 34vh',

    '@media (min-width: 574px)': {
      backgroundPosition: 'center 29vh',
    },

    '@media (min-width: 768px)': {
      backgroundPosition: '60vw 10vh',
    },

    '@media (min-width: 1024px)': {
      backgroundSize: '332px',
      backgroundPosition: '61vw 12vh',
    },

    '@media (min-width: 1366px)': {
      backgroundSize: '512px',
      backgroundPosition: '59vw 15vh',
    },
  },

  wrapper: {
    padding: '32px 0',

    '@media (min-width: 768px)': {
      padding: '0 0 16px',
    },

    '@media (min-width: 1366px)': {
      padding: '16px 0 20px',
    },
  },

  sectionContent: {
    '@media (min-width: 768px)': {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: '30px',
    },

    '@media (min-width: 1024px)': {
      margin: '50px 0 21px',
    },

    '@media (min-width: 1366px)': {
      marginTop: '31px',
    },
  },

  sectionText: {
    '@media (min-width: 768px)': {
      width: '324px',
      alignItems: 'normal',
    },

    '@media (min-width: 1024px)': {
      width: '436px',
    },

    '@media (min-width: 1366px)': {
      width: '607px',
    },

    '@media (min-width: 1920px)': {
      width: '827px',
    },
  },

  heading: {
    lineHeight: '100%',
    color: 'rgb(53, 74, 137)',

    '@media (min-width: 768px)': {
      textAlign: 'start',
    },

    '@media (min-width: 1024px)': {
      fontSize: '64px',
      marginBottom: '16px',
    },

    '@media (min-width: 1366px)': {
      fontSize: '80px',
    },

    '@media (min-width: 1920px)': {
      fontSize: '108px',
    },
  },

  subHeading: {
    lineHeight: '20px',
    color: 'rgb(0, 0, 0)',

    '@media (min-width: 768px)': {
      textAlign: 'start',
    },

    '@media (min-width: 1024px)': {
      fontSize: '20px',
      lineHeight: '25px',
    },

    '@media (min-width: 1366px)': {
      fontSize: '26px',
      lineHeight: '33px',
      marginBottom: '56px',
    },

    '@media (min-width: 1920px)': {
      fontSize: '38px',
      lineHeight: '48px',
    },
  },

  button: {
    width: '190px',
    height: '40px',
    background: 'rgba(247, 111, 96, 1)',
    borderRadius: '5px',
    lineHeight: '25px',
    color: '#FFFFFF',
    marginBottom: '38px',
    transition: '0.4s',

    ':hover': {
      background: 'rgba(247, 111, 96, 0.8)',
    },

    '@media (min-width: 768px)': {
      marginBottom: 0,
    },

    '@media (min-width: 1366px)': {
      width: '256px',
      height: '56px',
      fontSize: '28px',
      lineHeight: '35px',
    },
  },

  manImage: {
    marginBottom: '38px',
    width: '262px',
    zIndex: 50,

    '@media (min-width: 768px)': {
      marginBottom: 0,
    },

    '@media (min-width: 1024px)': {
      width: '355px',
    },

    '@media (min-width: 1366px)': {
      width: '500px',
    },

    '@media (min-width: 1920px)': {
      width: '560px',
      marginRight: '129px',
    },
  },

  arrowImage: {
    width: '54px',

    animation: 'arrowImageAnimation 3s linear infinite',

    '@keyframes arrowImageAnimation': {
      '0%, 100%': {
        transform: 'translateY(0)',
      },
      '50%': {
        transform: 'translateY(20px)',
      },
    },

    '@media (min-width: 1366px)': {
      width: '82px',
    },
  },

  circle: {
    display: 'inline-block',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(200, 213, 255, 1)',
  },

  firstCirclePosition: {
    top: '412px',
    left: '23vw',

    '@media (min-width: 430px)': {
      left: '28vw',
    },

    '@media (min-width: 530px)': {
      left: '30vw',
      top: '413px',
    },

    '@media (min-width: 574px)': {
      left: '32vw',
      top: '364px',
    },

    '@media (min-width: 650px)': {
      left: '35vw',
    },

    '@media (min-width: 768px)': {
      left: '64vw',
      top: '184px',
    },

    '@media (min-width: 1024px)': {
      left: '65vw',
      top: '235px',
    },

    '@media (min-width: 1366px)': {
      left: '64vw',
      top: '343px',
    },

    '@media (min-width: 1920px)': {
      left: '64vw',
      top: '350px',
    },
  },

  secondCirclePosition: {
    top: '39vh',
    left: '60vw',

    '@media (min-width: 430px)': {
      left: '59vw',
    },

    '@media (min-width: 530px)': {
      left: '57vw',
    },

    '@media (min-width: 574px)': {
      left: '56.5vw',
      top: '34vh',
    },

    '@media (min-width: 650px)': {
      left: '55.5vw',
    },

    '@media (min-width: 768px)': {
      left: '81.5vw',
      top: '15vh',
    },

    '@media (min-width: 860px)': {
      left: '80vw',
    },

    '@media (min-width: 940px)': {
      left: '78vw',
    },

    '@media (min-width: 1024px)': {
      left: '83vw',
      top: '19.5vh',
    },

    '@media (min-width: 1110px)': {
      left: '81vw',
    },

    '@media (min-width: 1230px)': {
      left: '79vw',
    },

    '@media (min-width: 1366px)': {
      left: '85vw',
      top: '27.5vh',
    },

    '@media (min-width: 1480px)': {
      left: '83vw',
    },

    '@media (min-width: 1600px)': {
      left: '82vw',
    },

    '@media (min-width: 1800px)': {
      left: '79vw',
    },

    '@media (min-width: 1920px)': {
      left: '78vw',
    },
  },

  titleAnimation: {
    animation: 'titleTextAnimation 1s forwards',

    '@keyframes titleTextAnimation': {
      '0%': {
        transform: 'translateY(90px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0))',
        opacity: 1,
      },
    },
  },

  subtitleAnimation: {
    animation: 'subtitleTextAnimation 1s forwards',
    animationDelay: '0.2s',

    '@keyframes subtitleTextAnimation': {
      '0%': {
        transform: 'translateY(90px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0))',
        opacity: 1,
      },
    },
  },

  buttonAnimation: {
    animation: 'buttonAnimation 1s forwards',
    animationDelay: '0.4s',

    '@keyframes buttonAnimation': {
      '0%': {
        transform: 'translateY(90px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0))',
        opacity: 1,
      },
    },
  },

  manAnimation: {
    animation: 'manImageAnimation 1s forwards',
    opacity: 0,

    '@keyframes manImageAnimation': {
      '0%': {
        transform: 'translateX(80px)',
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },
  },

  backgroundAnimation: {
    animation: 'backgroundManImageAnimation 4s forwards',

    '@keyframes backgroundManImageAnimation': {
      '0%': {
        transform: 'scale(2)',
        rotate: '90deg',
        opacity: 0,
      },
      '60%': {
        opacity: 1,
        rotate: '-10deg',
      },
      '100%': {
        transform: 'scale(1)',
        rotate: '0',
        opacity: 1,
      },
    },
  },

  instrumentsAnimation: {
    animation: 'instrumentImageAnimation 3s forwards',

    '@keyframes instrumentImageAnimation': {
      '0%': {
        transform: 'scale(0.5)',
        rotate: '-180deg',
        opacity: 0,
      },
      '40%': {
        opacity: 1,
        rotate: '7deg',
      },
      '60%': {
        opacity: 1,
        rotate: '-4deg',
      },
      '80%': {
        opacity: 1,
        rotate: '2deg',
      },
      '100%': {
        transform: 'scale(1)',
        rotate: '0',
        opacity: 1,
      },
    },
  },

  pulseFirstCircleAnimation: {
    animation: 'firstPulse 1s infinite ease-in-out alternate',
    animationDelay: '3s',

    '@keyframes firstPulse': {
      '0%': {
        transform: 'scale(0.8)',
        opacity: 0.2,
      },
      '100%': { transform: 'scale(1.2)', opacity: 0.8 },
    },
  },

  pulseSecondCircleAnimation: {
    animation: 'secondPulse 1s infinite ease-in-out alternate',
    animationDelay: '3.5s',

    '@keyframes secondPulse': {
      '0%': {
        transform: 'scale(0.8)',
        opacity: 0.2,
      },
      '100%': { transform: 'scale(1.2)', opacity: 0.8 },
    },
  },
};
