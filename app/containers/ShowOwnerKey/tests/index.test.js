import { ShowOwnerKey } from '../index';

const cmp = new ShowOwnerKey();
cmp.props = {
  showOwnerKeyDispatch: jest.fn(),
  hideOwnerKeyModalDispatch: jest.fn(),
  showOwnerKeyModalDispatch: jest.fn(),
  children: null,
  showOwnerKeyProcessing: false,
  showModal: false,
  sendEmailProcessing: false,
  locale: 'en',
  content: null,
  sendEmailDispatch: jest.fn(),
};

describe('<ShowOwnerKey />', () => {
  it('render', () => {
    expect(cmp.render()).toMatchSnapshot();
  });
});
