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

  it('changeLocale', () => {
    const locale = 'en';
    event.currentTarget.dataset.locale = locale;

    cmp.changeLocale(event);
    expect(cmp.props.changeLocaleDispatch).toHaveBeenCalledWith(locale);
  });
});
