import CommunitiesView from '../CommunitiesView';

const props = {
  communities: [
    {
      value: 1,
      id: 1,
      popularity: 10,
      label: 'label',
    },
  ],
};

describe('CommunitiesView', () => {
  it('test', () => {
    expect(CommunitiesView(props)).toMatchSnapshot();
  });
});
