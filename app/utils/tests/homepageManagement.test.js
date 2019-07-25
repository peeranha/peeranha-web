import { sendEmail, sendMessage } from '../homepageManagement';

beforeEach(() => {
  window.fetch = jest.fn().mockImplementation(() => ({
    status: 200,
  }));
});

it('sendEmail', async () => {
  const email = 'email';
  const refCode = 'refCode';
  const url = 'url';
  const info = 'info';

  const formData = {
    email,
    refCode,
  };

  const pageInfo = {
    url,
    info,
  };

  expect(fetch).toHaveBeenCalledTimes(0);

  await sendEmail(formData, pageInfo);

  expect(fetch).toHaveBeenCalledTimes(2);
});

it('sendMessage', async () => {
  const email = 'email';
  const refCode = 'refCode';
  const url = 'url';
  const info = 'info';

  const formData = {
    email,
    refCode,
  };

  const pageInfo = {
    url,
    info,
  };

  expect(fetch).toHaveBeenCalledTimes(0);

  await sendMessage(formData, pageInfo);

  expect(fetch).toHaveBeenCalledTimes(1);
});
