import renderField from '../renderField';

describe('renderField', () => {
  const props = {
    input: {},
    label: [],
    type: 'type',
    disabled: false,
    readOnly: false,
    translations: [],
    meta: {
      touched: false,
      error: 'error',
      warning: 'warning',
    },
  };

  it('case1: snapshot test, @readOnly is false', () => {
    props.readOnly = false;
    expect(renderField(props)).toMatchSnapshot();
  });

  it('case2: snapshot test, @readOnly is true', () => {
    props.readOnly = true;
    expect(renderField(props)).toMatchSnapshot();
  });

  it('case3: snapshot test, @touched is true', () => {
    props.meta.touched = true;
    expect(renderField(props)).toMatchSnapshot();
  });

  it('case4: snapshot test, @touched is false', () => {
    props.meta.touched = false;
    expect(renderField(props)).toMatchSnapshot();
  });

  it('case5: snapshot test, @error is true', () => {
    props.meta.touched = true;
    props.meta.error = true;
    expect(renderField(props)).toMatchSnapshot();
  });

  it('case6: snapshot test, @error is false', () => {
    props.meta.touched = true;
    props.meta.error = false;
    expect(renderField(props)).toMatchSnapshot();
  });

  it('case7: snapshot test, @warning is true', () => {
    props.meta.touched = true;
    props.meta.warning = true;
    expect(renderField(props)).toMatchSnapshot();
  });

  it('case8: snapshot test, @warning is false', () => {
    props.meta.touched = true;
    props.meta.warning = false;
    expect(renderField(props)).toMatchSnapshot();
  });
});
