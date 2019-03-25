import React from 'react';
import { shallow } from 'enzyme';

import ToastBox from '../ToastBox';
import { TOP_LEFT } from '../constants';

describe('<ToastBox />', () => {
  it('snapshot test', () => {
    const props = { location: TOP_LEFT };
    const renderedComponent = shallow(<ToastBox {...props} />);
    expect(renderedComponent).toMatchSnapshot();
  });
});
