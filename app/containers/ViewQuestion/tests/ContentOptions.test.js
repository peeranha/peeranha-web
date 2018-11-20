import ContentOptions, { setDataAttr } from '../ContentOptions';

const ev = {
  target: {
    parentElement: {
      dataset: {
        opened: 'true',
      },
    },
  },
};

describe('ContentOptions', () => {
  it('test, ContentOptions', () => {
    const props = {
      translations: {},
    };
    expect(ContentOptions(props)).toMatchSnapshot();
  });

  it('test, setDataAttr, @opened is true', () => {
    setDataAttr(ev);
    expect(ev.target.parentElement.dataset.opened).toEqual(false);
  });

  it('test, setDataAttr, @opened is null', () => {
    ev.target.parentElement.dataset.opened = null;
    setDataAttr(ev);
    expect(ev.target.parentElement.dataset.opened).toEqual(true);
  });
});
