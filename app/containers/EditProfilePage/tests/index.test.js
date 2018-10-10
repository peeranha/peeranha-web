import React from 'react';
import { shallow } from 'enzyme';

import { EditProfilePage } from '../index';

test('EditProfilePage', () => {
  const wrapper = shallow(<EditProfilePage />);
  expect(wrapper.instance().saveProfile()).toEqual(true);
});
