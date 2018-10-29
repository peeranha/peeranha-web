import ViewFormListItem from '../ViewFormListItem';

describe('ViewFormListItem test', () => {
  it('case1: test by snapshots, @props.message is true', () => {
    const props = { message: 'test' };
    expect(ViewFormListItem(props)).toMatchSnapshot();
  });

  it('case2: test by snapshots,  @props.message is false', () => {
    const props = {};
    expect(ViewFormListItem(props)).toMatchSnapshot();
  });
});
