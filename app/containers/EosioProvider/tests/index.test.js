import React from 'react';
import { shallow } from 'enzyme';

import { EosioProvider } from '../index';

describe('<EosioProvider />', () => {
  it('should render its children and call initEosio', () => {
    const children = <h1>Test</h1>;
    const initEosioSpy = jest.fn();
    const renderedComponent = shallow(
      <EosioProvider initEosio={initEosioSpy}>{children}</EosioProvider>,
    );
    expect(renderedComponent.contains(children)).toBe(true);
    expect(initEosioSpy).toBeCalledTimes(1);
  });
});
