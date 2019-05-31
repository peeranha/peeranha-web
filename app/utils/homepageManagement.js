import {
  AWS_URL,
  HUBSPOT_URL,
  HUBSPOT_PORTAL_ID,
  HUBSPOT_SEND_EMAIL_FORM_ID,
  HUBSPOT_SEND_MESSAGE_FORM_ID,
} from './constants';

export async function sendEmail(formData, pageInfo) {
  const fields = [
    {
      name: 'email',
      value: formData.email,
    },
  ];

  const fetchHubspot = async () => {
    await fetch(
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
  };

  const fetchAws = async () => {
    await fetch(AWS_URL, {
      method: 'POST',
      body: JSON.stringify({
        email: formData.email,
        codeValue: formData.refCode,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const promises = await Promise.all([fetchHubspot(), fetchAws()]);

  const notSuccess = promises.find(x => x.status !== 200);

  if (notSuccess) {
    throw new Error('Something went wrong...');
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
    throw new Error('Something went wrong...');
  }
}
