import OntLogo from 'images/ont.svg?inline';

const logos = {
  2: OntLogo,
};

const singleCommunities = process.env.SINGLE_COMMUNITIES.split(';')
  .map(x => x.split(','))
  .reduce((acc, [id, origin]) => {
    acc[id] = {
      origin,
      src: logos[id],
    };
    return acc;
  }, {});

export default singleCommunities;
