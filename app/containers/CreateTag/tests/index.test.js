import { CreateTag } from '../index';
import { NAME_FIELD, DESCRIPTION_FIELD } from '../constants';

const cmp = new CreateTag();
cmp.props = {
  locale: 'en',
  match: {
    params: {
      communityid: 1,
    },
  },
  createTagLoading: false,
  suggestTagDispatch: jest.fn(),
};

describe('<CreateTag />', () => {
  it('createTag', () => {
    const obj0 = new Map();
    const obj1 = jest.fn();
    const obj2 = {
      reset: jest.fn(),
    };

    const tag = {
      name: obj0.get(NAME_FIELD),
      description: obj0.get(DESCRIPTION_FIELD),
      communityid: cmp.props.match.params.communityid,
    };

    cmp.createTag(obj0, obj1, obj2);
    expect(cmp.props.suggestTagDispatch).toHaveBeenCalledWith(tag, obj2.reset);
  });

  it('render', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
