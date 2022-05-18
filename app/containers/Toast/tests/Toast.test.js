import React from 'react';
import { shallow } from 'enzyme';

import Toast from '../Toast';

describe('<Toast />', () => {
  it('snapshot test', () => {
    const props = { type: 'info' };
    const renderedComponent = shallow(<Toast type={props.type} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
