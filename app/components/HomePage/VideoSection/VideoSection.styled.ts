import videoImage from 'images/video.svg?inline';
import videoBackgroundLeftImage from 'images/video-background-left.svg?inline';
import videoBackgroundRightImage from 'images/video-background-right.svg?inline';
import videoLeftImage from 'images/video-left.svg?inline';
import videoRightImage from 'images/video-right.svg?inline';

export const styles = {
  background: {
    padding: '40px 0 39px',

    '@media (min-width: 768px)': {
      padding: '72px 0 63px',
    },

    '@media (min-width: 1024px)': {
      padding: '80px 0 74px',
    },

    '@media (min-width: 1366px)': {
      padding: '100px 0 70px',
    },

    '@media (min-width: 1920px)': {
      padding: '120px 0 110px',
    },
  },

  videoImage: {
    position: 'relative',
    background: `url(${videoImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    width: '91vw',
    height: '47vw',
    zIndex: 5,

    '@media (min-width: 768px)': {
      width: '72vw',
      height: '37vw',
    },

    '@media (min-width: 1366px)': {
      width: '69vw',
      height: '35vw',
    },

    '@media (min-width: 1920px)': {
      width: '60vw',
      height: '31vw',
    },
  },

  videoIframe: {
    width: '82vw',
    height: '41vw',
    paddingTop: '0vw',
    paddingLeft: '10vw',

    '@media (min-width: 768px)': {
      width: '65vw',
      height: '32.5vw',
      paddingTop: '0vw',
      paddingLeft: '8vw',
    },

    '@media (min-width: 1366px)': {
      width: '62vw',
      height: '30.5vw',
      paddingTop: '0vw',
      paddingLeft: '7vw',
    },

    '@media (min-width: 1920px)': {
      width: '54vw',
      height: '26vw',
      paddingTop: '0vw',
      paddingLeft: '7vw',
    },
  },

  videoLeft: {
    backgroundImage: `url(${videoLeftImage})`,
    backgroundSize: '12.5vw',
    backgroundPosition: '3.5vw 5vw',

    '@media (min-width: 768px)': {
      backgroundSize: '9.5vw',
      backgroundPosition: '13vw 10vw',
    },

    '@media (min-width: 1024px)': {
      backgroundPosition: '13.5vw 8vw',
    },

    '@media (min-width: 1366px)': {
      backgroundPosition: '15vw 8vw',
    },

    '@media (min-width: 1920px)': {
      backgroundSize: '8.5vw',
      backgroundPosition: '19.5vw 6vw',
    },
  },

  videoBackgroundLeft: {
    backgroundImage: `url(${videoBackgroundLeftImage})`,
    backgroundSize: '24vw',
    backgroundPosition: '-5vw 29vw',

    '@media (min-width: 768px)': {
      backgroundSize: '17vw',
      backgroundPosition: '6vw 26vw',
    },

    '@media (min-width: 1024px)': {
      backgroundSize: '18vw',
      backgroundPosition: '6vw 24vw',
    },

    '@media (min-width: 1920px)': {
      backgroundSize: '16vw',
      backgroundPosition: '11vw 21.5vw',
    },
  },

  videoBackgroundRight: {
    backgroundImage: `url(${videoBackgroundRightImage})`,
    backgroundSize: '24.5vw',
    backgroundPosition: '76vw 20vw',

    '@media (min-width: 768px)': {
      backgroundSize: '19.5vw',
      backgroundPosition: '73vw 13vw',
    },

    '@media (min-width: 1024px)': {
      backgroundPosition: '73vw 16vw',
    },

    '@media (min-width: 1366px)': {
      backgroundPosition: '77vw 13vw',
    },

    '@media (min-width: 1920px)': {
      backgroundSize: '15.5vw',
      backgroundPosition: '73vw 14vw',
    },
  },

  videoRight: {
    backgroundImage: `url(${videoRightImage})`,
    backgroundSize: '24vw',
    backgroundPosition: '70vw 12vw',

    '@media (min-width: 768px)': {
      backgroundSize: '20vw',
      backgroundPosition: '65vw 8.5vw',
    },

    '@media (min-width: 1024px)': {
      backgroundSize: '18vw',
      backgroundPosition: '67vw 10.5vw',
    },

    '@media (min-width: 1366px)': {
      backgroundPosition: '66vw 7.5vw',
    },

    '@media (min-width: 1920px)': {
      backgroundSize: '15vw',
      backgroundPosition: '64vw 8.5vw',
    },
  },

  videoImageAnimation: {
    animation: 'videoImageAnimation 1s forwards',
    opacity: 0,

    '@keyframes videoImageAnimation': {
      '0%': {
        transform: 'translateY(100px)',
        opacity: '0',
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: '100%',
      },
    },
  },

  videoLeftAnimation: {
    animation: 'videoLeftImageAnimation 1s forwards',
    opacity: 0,
    animationDelay: '0.7s',

    '@keyframes videoLeftImageAnimation': {
      '0%': {
        transform: 'translateX(80px)',
        opacity: '0',
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: '100%',
      },
    },
  },

  videoBackgroundLeftAnimation: {
    animation: 'videoBackgroundLeftImageAnimation 1s forwards',
    opacity: 0,
    animationDelay: '1.2s',

    '@keyframes videoBackgroundLeftImageAnimation': {
      '0%': {
        transform: 'translateX(80px)',
        opacity: '0',
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: '100%',
      },
    },
  },

  videoBackgroundRightAnimation: {
    animation: 'videoBackgroundRightImageAnimation 1s forwards',
    opacity: 0,
    animationDelay: '1.2s',

    '@keyframes videoBackgroundRightImageAnimation': {
      '0%': {
        transform: 'translateX(-80px)',
        opacity: '0',
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: '100%',
      },
    },
  },

  videoRightAnimation: {
    animation: 'videoRightImageAnimation 1s forwards',
    opacity: 0,
    animationDelay: '0.7s',

    '@keyframes videoRightImageAnimation': {
      '0%': {
        transform: 'translateX(-80px)',
        opacity: '0',
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: '100%',
      },
    },
  },
};
