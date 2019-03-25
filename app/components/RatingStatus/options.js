import bannedSm from 'svg/bannedSm';
import strangerSm from 'svg/strangerSm';
import newbieSm from 'svg/newbieSm';
import jrResidentSm from 'svg/jrResidentSm';
import residentSm from 'svg/residentSm';
import srResidentSm from 'svg/srResidentSm';
import heroResidentSm from 'svg/heroResidentSm';
import legendaryResidentSm from 'svg/legendaryResidentSm';

import bannedLg from 'svg/bannedLg';
import strangerLg from 'svg/strangerLg';
import newbieLg from 'svg/newbieLg';
import jrResidentLg from 'svg/jrResidentLg';
import residentLg from 'svg/residentLg';
import srResidentLg from 'svg/srResidentLg';
import heroResidentLg from 'svg/heroResidentLg';
import legendaryResidentLg from 'svg/legendaryResidentLg';

import messages from './messages';

const options = {
  banned: {
    minRating: -99999999999999999999,
    maxRating: 0,
    messageId: messages.banned.id,
    icon: {
      sm: bannedSm,
      lg: bannedLg,
    },
  },
  stranger: {
    minRating: 0,
    maxRating: 100,
    messageId: messages.stranger.id,
    icon: {
      sm: strangerSm,
      lg: strangerLg,
    },
  },
  newbie: {
    minRating: 100,
    maxRating: 500,
    messageId: messages.newbie.id,
    icon: {
      sm: newbieSm,
      lg: newbieLg,
    },
  },
  jrResident: {
    minRating: 500,
    maxRating: 1000,
    messageId: messages.jrResident.id,
    icon: {
      sm: jrResidentSm,
      lg: jrResidentLg,
    },
  },
  resident: {
    minRating: 1000,
    maxRating: 2500,
    messageId: messages.resident.id,
    icon: {
      sm: residentSm,
      lg: residentLg,
    },
  },
  srResident: {
    minRating: 2500,
    maxRating: 5000,
    messageId: messages.srResident.id,
    icon: {
      sm: srResidentSm,
      lg: srResidentLg,
    },
  },
  heroResident: {
    minRating: 5000,
    maxRating: 10000,
    messageId: messages.heroResident.id,
    icon: {
      sm: heroResidentSm,
      lg: heroResidentLg,
    },
  },
  legResident: {
    minRating: 10000,
    maxRating: 10000000000000000000000,
    messageId: messages.legResident.id,
    icon: {
      sm: legendaryResidentSm,
      lg: legendaryResidentLg,
    },
  },
};

export default options;
