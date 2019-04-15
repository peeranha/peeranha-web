import { sendEmail, sendMessage } from '../homepageManagement';

jest.setTimeout(10000);

window.fetch = jest.fn();

const formData = {
  name: 'name',
  secondName: '2ndname',
};

const pageInfo = {
  url: 'url',
  name: 'name',
};

describe('sendEmail', () => {
  it('test', async () => {
    const step = await sendEmail(formData, pageInfo);
    expect(step).toBe(true);
  });
});

describe('sendMessage', () => {
  it('test', async () => {
    const step = await sendMessage(formData, pageInfo);
    expect(step).toBe(true);
  });
});
