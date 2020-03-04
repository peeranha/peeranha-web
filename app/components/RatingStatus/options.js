import bannedSm from 'images/bannedSm.svg?inline';
import strangerSm from 'images/strangerSm.svg?inline';
import newbieSm from 'images/newbieSm.svg?inline';
import jrResidentSm from 'images/jrResidentSm.svg?inline';
import residentSm from 'images/residentSm.svg?inline';
import srResidentSm from 'images/srResidentSm.svg?inline';
import heroResidentSm from 'images/heroResidentSm.svg?inline';
import legendaryResidentSm from 'images/legendaryResidentSm.svg?inline';

import bannedLg from 'images/bannedLg.svg?inline';
import strangerLg from 'images/strangerLg.svg?inline';
import newbieLg from 'images/newbieLg.svg?inline';
import jrResidentLg from 'images/jrResidentLg.svg?inline';
import residentLg from 'images/residentLg.svg?inline';
import srResidentLg from 'images/srResidentLg.svg?inline';
import heroResidentLg from 'images/heroResidentLg.svg?inline';
import legendaryResidentLg from 'images/legendaryResidentLg.svg?inline';

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
    },
  },
  newbie: {
    minRating: 100,
    maxRating: 499,
    maxEnergy: 100,
    messageId: messages.newbie.id,
    icon: {
      sm: newbieSm,
      lg: newbieLg,
    },
  },
  jrResident: {
    minRating: 500,
    maxRating: 999,
    maxEnergy: 150,
    messageId: messages.jrResident.id,
    icon: {
      sm: jrResidentSm,
      lg: jrResidentLg,
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
    },
  },
};

export default options;
