import { ShowActiveKey } from '../index';

const cmp = new ShowActiveKey();
cmp.props = {
  showActiveKeyDispatch: jest.fn(),
  hideActiveKeyModalDispatch: jest.fn(),
  showActiveKeyModalDispatch: jest.fn(),
  children: null,
  showActiveKeyProcessing: false,
  showModal: true,
  locale: 'en',
};

describe('<ShowActiveKey />', () => {
  it('render', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
