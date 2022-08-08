import BannedIcon from 'icons/Banned';
import StrangerBigIcon from 'icons/StrangerBig';
import StrangerIcon from 'icons/Stranger';
import NewbieIcon from 'icons/Newbie';
import HeroIcon from 'icons/Hero';
import JuniorIcon from 'icons/Junior';
import RedidentIcon from 'icons/Redident';
import SuperHeroIcon from 'icons/SuperHero';

import messages from './messages';

const options = {
  banned: {
    minRating: -99999999999999999999,
    maxRating: -1,
    maxEnergy: 0,
    messageId: messages.banned.id,
    icon: {
      sm: <BannedIcon className="dif mr-1" stroke="#DC3545" />,
      lg: <BannedIcon className="dif mr-1" stroke="#DC3545" size={[16, 16]} />,
      size: {
        sm: {
          width: '9',
          height: '9',
        },
        lg: {
          width: '16',
          height: '16',
        },
      },
    },
  },
  stranger: {
    minRating: 0,
    maxRating: 99,
    maxEnergy: 50,
    messageId: messages.stranger.id,
    icon: {
      sm: <StrangerBigIcon size={[15, 9]} stroke="#576FED" fill="#dde2fb" />,
      lg: <StrangerBigIcon size={[26, 16]} stroke="#576FED" fill="#dde2fb" />,
      size: {
        sm: {
          width: '9',
          height: '9',
        },
        lg: {
          width: '16',
          height: '16',
        },
      },
    },
  },
  newbie: {
    minRating: 100,
    maxRating: 499,
    maxEnergy: 100,
    messageId: messages.newbie.id,
    icon: {
      sm: <NewbieIcon size={[15, 9]} stroke="#576FED" fill="#dde2fb" />,
      lg: <NewbieIcon size={[26, 16]} stroke="#576FED" fill="#dde2fb" />,
      size: {
        sm: {
          width: '15',
          height: '9',
        },
        lg: {
          width: '26',
          height: '16',
        },
      },
    },
  },
  jrResident: {
    minRating: 500,
    maxRating: 999,
    maxEnergy: 150,
    messageId: messages.jrResident.id,
    icon: {
      sm: <HeroIcon size={[21, 9]} stroke="#576FED" fill="#dde2fb" />,
      lg: <HeroIcon size={[36, 16]} stroke="#576FED" fill="#dde2fb" />,
      size: {
        sm: {
          width: '21',
          height: '9',
        },
        lg: {
          width: '36',
          height: '16',
        },
      },
    },
  },
  resident: {
    minRating: 1000,
    maxRating: 2499,
    maxEnergy: 200,
    messageId: messages.resident.id,
    icon: {
      sm: <StrangerIcon size={[9, 9]} stroke="#576FED" fill="#dde2fb" />,
      lg: <StrangerIcon size={[16, 16]} stroke="#576FED" fill="#dde2fb" />,
      size: {
        sm: {
          width: '9',
          height: '9',
        },
        lg: {
          width: '16',
          height: '16',
        },
      },
    },
  },
  srResident: {
    minRating: 2500,
    maxRating: 4999,
    maxEnergy: 250,
    messageId: messages.srResident.id,
    icon: {
      sm: <JuniorIcon size={[15, 9]} stroke="#576FED" fill="#dde2fb" />,
      lg: <JuniorIcon size={[26, 16]} stroke="#576FED" fill="#dde2fb" />,
      size: {
        sm: {
          width: '15',
          height: '9',
        },
        lg: {
          width: '26',
          height: '16',
        },
      },
    },
  },
  heroResident: {
    minRating: 5000,
    maxRating: 9999,
    maxEnergy: 300,
    messageId: messages.heroResident.id,
    icon: {
      sm: <RedidentIcon size={[21, 9]} stroke="#576FED" fill="#dde2fb" />,
      lg: <RedidentIcon size={[36, 16]} stroke="#576FED" fill="#dde2fb" />,
      size: {
        sm: {
          width: '21',
          height: '9',
        },
        lg: {
          width: '36',
          height: '16',
        },
      },
    },
  },
  legResident: {
    minRating: 10000,
    maxRating: 10000000000000000000000,
    maxEnergy: 350,
    messageId: messages.legResident.id,
    icon: {
      sm: <SuperHeroIcon size={[11, 9]} stroke="#576FED" fill="#dde2fb" />,
      lg: <SuperHeroIcon size={[19, 16]} stroke="#576FED" fill="#dde2fb" />,
      size: {
        sm: {
          width: '11',
          height: '9',
        },
        lg: {
          width: '19',
          height: '16',
        },
      },
    },
  },
};

export default options;
