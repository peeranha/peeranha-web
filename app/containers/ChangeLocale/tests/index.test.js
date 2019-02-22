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

describe('ChangeLocale', () => {
  it('mapLanguages', () => {
    const langs = ['en', 'ru'];
    expect(cmp.mapLanguages(langs)).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    const locale = 'en';

    it('localstorage not null', () => {
      localStorage.setItem('locale', locale);

      cmp.componentDidMount();
      expect(cmp.props.changeLocaleDispatch).toHaveBeenCalledWith(locale);
    });

    it('localstorage is null', () => {
      localStorage.setItem('locale', '');

      cmp.componentDidMount();
      expect(cmp.props.changeLocaleDispatch).not.toHaveBeenCalledWith(locale);
    });
  });

  it('changeLocale', () => {
    const locale = 'en';
    event.currentTarget.dataset.locale = locale;

    cmp.changeLocale(event);
    expect(cmp.props.changeLocaleDispatch).toHaveBeenCalledWith(locale);
  });
});
