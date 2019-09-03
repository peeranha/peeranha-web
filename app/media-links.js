const links = {
  en: {
    facebook: '',
    twitter: 'https://twitter.com/peeranhaio',
    github: 'https://github.com/peeranha',
    linkedin: 'https://www.linkedin.com/company/peeranha/about/',
    medium: 'https://medium.com/peeranha',
  },
  ru: {
    facebook: 'https://www.facebook.com/peeranha1/',
    twitter: 'https://twitter.com/peeranha',
    github: 'https://github.com/peeranha',
    linkedin: 'https://www.linkedin.com/company/peeranha/about/',
    medium: 'https://medium.com/peeranha',
  },
};

export const getLinks = locale => links[locale] || links.en;
