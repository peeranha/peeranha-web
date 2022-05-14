import CreateTag from "containers/CreateTag/index";
import { NAME_FIELD, DESCRIPTION_FIELD, FORM_COMMUNITY } from '../constants';

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
  communities: [{ id: 1 }, { id: 2 }],
};

describe('<CreateTag />', () => {
  it('createTag', () => {
    const obj0 = new Map();
    const obj1 = jest.fn();
    const obj2 = {
      reset: jest.fn(),
    };

    obj0
      .set(FORM_COMMUNITY, { id: 1 })
      .set(DESCRIPTION_FIELD, DESCRIPTION_FIELD)
      .set(NAME_FIELD, NAME_FIELD);

    const tag = {
      name: obj0.get(NAME_FIELD),
      description: obj0.get(DESCRIPTION_FIELD),
      communityId: obj0.get(FORM_COMMUNITY).id,
    };

    cmp.createTag(obj0, obj1, obj2);
    expect(cmp.props.suggestTagDispatch).toHaveBeenCalledWith(tag, obj2.reset);
  });

  it('render', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
