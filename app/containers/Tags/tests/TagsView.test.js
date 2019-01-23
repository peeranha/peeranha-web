import TagsView from '../TagsView';

const props = {
  tags: [
    {
      value: 1,
      id: 1,
      popularity: 10,
      label: 'label',
    },
  ],
};

describe('TagsView', () => {
  it('test', () => {
    expect(TagsView(props)).toMatchSnapshot();
  });
});
