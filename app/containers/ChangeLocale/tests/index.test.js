import React from 'react';
import { shallow } from 'enzyme';

import 'jest-styled-components';
import renderer from 'react-test-renderer';

import { ChangeLocale } from '../index';

describe('<ChangeLocale />', () => {
  const wrapper = shallow(<ChangeLocale />);

  it('mapLanguages: all languages are rendered', () => {
    const langs = ['en', 'ru'];
    wrapper.instance().props = jest.fn().mockImplementationOnce(() => {});
    wrapper.instance().props.changeLocaleDispatch = jest
      .fn()
      .mockImplementationOnce(() => {});
    expect(wrapper.instance().mapLanguages(langs).length).toEqual(langs.length);
  });

  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<ChangeLocale />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
