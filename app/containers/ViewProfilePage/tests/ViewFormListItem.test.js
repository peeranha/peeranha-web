import ViewFormListItem from '../ViewFormListItem';

const props = {
  label: {
    id: 'messageId',
    defaultMessage: 'defaultMessage',
  },
  message: '',
};

describe('ViewFormListItem test', () => {
  it('case1: test by snapshots, @props.message is true', () => {
    props.message = 'user';
    expect(ViewFormListItem(props)).toMatchSnapshot();
  });

  it('case2: test by snapshots,  @props.message is false', () => {
    props.message = '';
    expect(ViewFormListItem(props)).toMatchSnapshot();
  });
});
