import { fromJS } from 'immutable';
import { EditProfilePage } from '../index';

const cmp = new EditProfilePage();

cmp.props = {
  saveProfileDispatch: jest.fn(),
  setDefaultReducerDispatch: jest.fn(),
  profile: {
    profile: {
      a: 11,
      c: 14,
    },
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
    const values = fromJS({ a: 12, b: 12 });
    const profile = {
      ...cmp.props.profile.profile,
      ...values.toJS(),
    };

    it('test', () => {
      cmp.saveProfile(values);
      expect(cmp.props.saveProfileDispatch).toHaveBeenCalledWith({
        profile,
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
