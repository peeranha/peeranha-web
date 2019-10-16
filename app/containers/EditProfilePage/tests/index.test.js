import { fromJS } from 'immutable';
import { LOCATION_FIELD } from 'containers/Profile/constants';
import { EditProfilePage } from '../index';

const cmp = new EditProfilePage();

cmp.props = {
  saveProfileDispatch: jest.fn(),
  setDefaultReducerDispatch: jest.fn(),
  profile: {
    profile: {},
  },
  match: {
    params: {
      id: null,
    },
  },
  account: 'user1',
  isProfileSaving: false,
  questions: [],
  questionsWithUserAnswers: [],
};

describe('<EditProfilePage>', () => {
  describe('componentWillUnmount', () => {
    it('test', () => {
      cmp.componentWillUnmount();
      expect(cmp.props.setDefaultReducerDispatch).toHaveBeenCalled();
    });
  });

  describe('saveProfile', () => {
    const newMap = fromJS({});

    const a = 12;
    const b = 1234;

    newMap.a = a;
    newMap.b = b;

    it('test', () => {
      cmp.saveProfile(newMap);
      expect(cmp.props.saveProfileDispatch).toHaveBeenCalledWith({
        profile: {
          ...cmp.props.profile.profile,
          ...newMap.toJS(),
          [LOCATION_FIELD]: '',
        },
        userKey: cmp.props.match.params.id,
      });
    });
  });

  describe('render', () => {
    it('test', () => {
      expect(cmp.render()).toMatchSnapshot();
    });
  });
});
