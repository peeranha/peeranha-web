import bannedSm from 'images/bannedSm.svg?external';
import strangerSm from 'images/strangerSm.svg?external';
import residentSm from 'images/residentSm.svg?external';
import srResidentSm from 'images/srResidentSm.svg?external';
import heroResidentSm from 'images/heroResidentSm.svg?external';
import legendaryResidentSm from 'images/legendaryResidentSm.svg?external';

import bannedLg from 'images/bannedLg.svg?external';
import strangerLg from 'images/strangerLg.svg?external';
import newbieLg from 'images/newbieLg.svg?external';
import jrResidentLg from 'images/jrResidentLg.svg?external';
import residentLg from 'images/residentLg.svg?external';
import srResidentLg from 'images/srResidentLg.svg?external';
import heroResidentLg from 'images/heroResidentLg.svg?external';
import legendaryResidentLg from 'images/legendaryResidentLg.svg?external';

import messages from './messages';

const options = {
  banned: {
    minRating: -99999999999999999999,
    maxRating: -1,
    maxEnergy: 0,
    messageId: messages.banned.id,
    icon: {
      sm: bannedSm,
      lg: bannedLg,
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
      sm: strangerSm,
      lg: strangerLg,
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
      sm: srResidentSm,
      lg: newbieLg,
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
      sm: heroResidentSm,
      lg: jrResidentLg,
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
      sm: residentSm,
      lg: residentLg,
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
      sm: srResidentSm,
      lg: srResidentLg,
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
      sm: heroResidentSm,
      lg: heroResidentLg,
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
      sm: legendaryResidentSm,
      lg: legendaryResidentLg,
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
