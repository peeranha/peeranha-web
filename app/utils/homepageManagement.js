import {
  HUBSPOT_URL,
  HUBSPOT_PORTAL_ID,
  HUBSPOT_SEND_EMAIL_FORM_ID,
  HUBSPOT_SEND_MESSAGE_FORM_ID,
} from './constants';

export async function sendEmail(formData, pageInfo) {
  const fields = Object.keys(formData).map(name => ({
    name,
    value: formData[name],
  }));

  await fetch(
    `${HUBSPOT_URL}/${HUBSPOT_PORTAL_ID}/${HUBSPOT_SEND_EMAIL_FORM_ID}`,
    {
      method: 'POST',
      body: JSON.stringify({
        submittedAt: +new Date(),
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

  return true;
}

/* istanbul ignore next */
export function scrollToSection() {
  const { hash } = window.location;

  if (hash) {
    window.$('html, body').animate(
      {
        scrollTop: window.$(hash).offset().top,
      },
      250,
    );
  }
}

export async function sendMessage(formData, pageInfo) {
  const fields = Object.keys(formData).map(name => ({
    name,
    value: formData[name],
  }));

  await fetch(
    `${HUBSPOT_URL}/${HUBSPOT_PORTAL_ID}/${HUBSPOT_SEND_MESSAGE_FORM_ID}`,
    {
      method: 'POST',
      body: JSON.stringify({
        submittedAt: +new Date(),
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

  return true;
}
