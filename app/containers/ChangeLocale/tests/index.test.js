import { ChangeLocale, mapDispatchToProps } from '../index';

const cmp = new ChangeLocale();
const changeLocaleDispatch = 'changeLocaleDispatch';

cmp.props = {};
cmp.props.changeLocaleDispatch = () => changeLocaleDispatch;

describe('ChangeLocale', () => {
  it('mapLanguages', () => {
    const langs = ['en', 'ru'];
    expect(cmp.mapLanguages(langs)).toMatchSnapshot();
  });

  it('mapDispatchToProps test', () => {
    const test = 'test';
    const dispatch = () => test;

    expect(typeof mapDispatchToProps(dispatch) === 'object').toBe(true);
    expect(mapDispatchToProps(dispatch).dispatch).toBe(dispatch);
    expect(mapDispatchToProps(dispatch).changeLocaleDispatch()).toBe(test);
  });
});
