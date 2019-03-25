import { library } from '@fortawesome/fontawesome-svg-core';
import '../icons-config';

describe('@library: add', () => {
  const mapp = new Map();
  library.add = jest.fn().mockImplementation(item => {
    mapp.set(item, item);
  });

  it('test', () => {
    const icon = 'fa-icon';
    library.add(icon);

    expect(mapp.get(icon)).toBe(icon);
  });
});
