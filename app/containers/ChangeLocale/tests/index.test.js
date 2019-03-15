import { ChangeLocale } from '../index';

const cmp = new ChangeLocale();

cmp.props = {};
cmp.props.changeLocaleDispatch = jest.fn();

const event = {
  currentTarget: {
    dataset: {
      locale: 'en',
    },
  },
};

beforeEach(() => {
  cmp.props.changeLocaleDispatch.mockClear();
});

/* eslint prefer-destructuring: 0 */
describe('ChangeLocale', () => {
  it('mapLanguages', () => {
    const langs = ['en', 'ru'];
    expect(cmp.mapLanguages(langs)).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    let locale = 'en';

    it('localstorage not null', () => {
      localStorage.setItem('locale', locale);

      cmp.componentDidMount();
      expect(cmp.props.changeLocaleDispatch).toHaveBeenCalledWith(locale);
    });

    it('localstorage is null', () => {
      const languages = ['en'];

      window.navigator = {
        languages,
      };

      locale = window.navigator.languages.filter(x => languages.includes(x))[0];

      localStorage.setItem('locale', '');

      cmp.componentDidMount();
      expect(cmp.props.changeLocaleDispatch).toHaveBeenCalledWith(locale);
    });
  });

  it('changeLocale', () => {
    const locale = 'en';
    event.currentTarget.dataset.locale = locale;

    cmp.changeLocale(event);
    expect(cmp.props.changeLocaleDispatch).toHaveBeenCalledWith(locale);
  });
});
