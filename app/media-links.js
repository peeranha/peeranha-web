const links = {
  en: {
    facebook: '',
    twitter: 'https://twitter.com/peerania_com',
    github: 'https://github.com/peerania',
    linkedin: 'https://www.linkedin.com/company/peeraniacom/about/',
    medium: 'https://medium.com/peerania',
  },
  ru: {
    facebook: 'https://www.facebook.com/peerania1/',
    twitter: 'https://twitter.com/peerania_com',
    github: 'https://github.com/peerania',
    linkedin: 'https://www.linkedin.com/company/peeraniacom/about/',
    medium: 'https://medium.com/peerania',
  },
};

export const getLinks = locale => links[locale] || links.en;
