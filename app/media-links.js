const links = {
  en: {
    facebook: '',
    twitter: 'https://twitter.com/peeranhaio',
    github: 'https://github.com/peeranha',
    linkedin: 'https://www.linkedin.com/company/peeranha/about/',
    medium: 'https://medium.com/peeranha',
    telegram: 'https://t.me/peeranhaio',
    email: 'mailto:hello@peeranha.io',
    markdownCheatSheet: 'https://www.markdownguide.org/cheat-sheet/',
  },
  ru: {
    facebook: 'https://www.facebook.com/peeranha1/',
    twitter: 'https://twitter.com/peeranhaio',
    github: 'https://github.com/peeranha',
    linkedin: 'https://www.linkedin.com/company/peeranha/about/',
    medium: 'https://medium.com/peeranha',
    telegram: 'https://t.me/peeranhaio',
    email: 'mailto:hello@peeranha.io',
    markdownCheatSheet: 'https://www.markdownguide.org/cheat-sheet/',
  },
};

export const getLinks = locale => links[locale] || links.en;
