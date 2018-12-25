import { ChangeLocale, mapDispatchToProps } from '../index';

const cmp = new ChangeLocale();

cmp.props = {};
cmp.props.changeLocaleDispatch = jest.fn();

beforeEach(() => {
  cmp.props.changeLocaleDispatch.mockClear();
});

describe('ChangeLocale', () => {
  it('mapLanguages', () => {
    const langs = ['en', 'ru'];
    expect(cmp.mapLanguages(langs)).toMatchSnapshot();
  });

  describe('componentWillMount', () => {
    const locale = 'en';

    it('localstorage not null', () => {
      localStorage.setItem('locale', locale);

      cmp.componentWillMount();
      expect(cmp.props.changeLocaleDispatch).toHaveBeenCalledWith(locale);
    });

    it('localstorage is null', () => {
      localStorage.setItem('locale', '');

      cmp.componentWillMount();
      expect(cmp.props.changeLocaleDispatch).not.toHaveBeenCalledWith(locale);
    });
  });

  it('changeLocale', () => {
    const locale = 'en';

    cmp.changeLocale(locale);
    expect(cmp.props.changeLocaleDispatch).toHaveBeenCalledWith(locale);
  });

  it('mapDispatchToProps test', () => {
    const test = 'test';
    const dispatch = () => test;

    expect(typeof mapDispatchToProps(dispatch) === 'object').toBe(true);
    expect(mapDispatchToProps(dispatch).dispatch).toBe(dispatch);
    expect(mapDispatchToProps(dispatch).changeLocaleDispatch()).toBe(test);
  });
});
