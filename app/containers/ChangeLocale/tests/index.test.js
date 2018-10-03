import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { changeLocale } from 'containers/LanguageProvider/actions';

import { ChangeLocale } from '../index';

describe('<ChangeLocale />', () => {
  it('mapLanguages: all languages are rendered', () => {
    const langs = ['en', 'ru'];
    ChangeLocale.props = jest.fn().mockImplementationOnce(() => {});
    ChangeLocale.props.changeLocaleDispatch = jest
      .fn()
      .mockImplementationOnce(() => {});
    expect(ChangeLocale.mapLanguages(langs).length).toEqual(langs.length);
  });

  it('changeLanguage: returns action with established language', () => {
    const lang = 'en';
    ChangeLocale.props.changeLocaleDispatch = jest
      .fn()
      .mockImplementationOnce(changeLocale);
    expect(ChangeLocale.changeLanguage(lang).locale).toBe(lang);
  });

  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<ChangeLocale />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });
});
