import {
  AWS_URL,
  HUBSPOT_URL,
  HUBSPOT_PORTAL_ID,
  HUBSPOT_SEND_EMAIL_FORM_ID,
  HUBSPOT_SEND_MESSAGE_FORM_ID,
} from './constants';

import { ApplicationError } from './errors';

export async function sendEmail(formData, pageInfo) {
  const fields = [
    {
      name: 'email',
      value: formData.email,
    },
    {
      name: 'message',
      value: 'description test fffff',
    },
  ];

  const v = await fetch(
    `${HUBSPOT_URL}/${HUBSPOT_PORTAL_ID}/${HUBSPOT_SEND_EMAIL_FORM_ID}`,
    {
      method: 'POST',
      body: JSON.stringify({
        submittedAt: Date.now(),
        fields,
        context: {
          pageUri: pageInfo.url,
          pageName: pageInfo.name,
        },
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'same-origin',
    },
  );
  console.log(v);
  if (v.status !== 200) {
    throw new ApplicationError('Something went wrong...');
  }
}

export async function sendMessage(formData, pageInfo) {
  const fields = Object.keys(formData).map(name => ({
    name,
    value: formData[name],
  }));

  const { status } = await fetch(
    `${HUBSPOT_URL}/${HUBSPOT_PORTAL_ID}/${HUBSPOT_SEND_MESSAGE_FORM_ID}`,
    {
      method: 'POST',
      body: JSON.stringify({
        submittedAt: Date.now(),
        fields,
        context: {
          pageUri: pageInfo.url,
          pageName: pageInfo.name,
        },
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'same-origin',
    },
  );

  if (status !== 200) {
    throw new ApplicationError('Something went wrong...');
  }
}
