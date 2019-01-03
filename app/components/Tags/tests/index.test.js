import Tags from '../index';

describe('Tags', () => {
  const props = {
    communities: [
      {
        id: 1,
        name: 'name',
        tags: [
          {
            id: 1,
            name: 'tag1',
          },
          {
            id: 2,
            name: 'tag2',
          },
          {
            id: 3,
            name: 'tag3',
          },
        ],
      },
    ],
    communityId: 1,
    chosenTags: [1, 2],
  };

  it('test, chosenTags - [... , .... , ...]', () => {
    expect(Tags(props)).toMatchSnapshot();
  });
});
