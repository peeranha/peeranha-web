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

  await window.$.ajax({
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    url: `${HUBSPOT_URL}/${HUBSPOT_PORTAL_ID}/${HUBSPOT_SEND_EMAIL_FORM_ID}`,
    data: JSON.stringify({
      submittedAt: +new Date(),
      fields,
      context: {
        pageUri: pageInfo.url,
        pageName: pageInfo.name,
      },
    }),
  });

  return true;
}

export async function sendMessage(formData, pageInfo) {
  const fields = Object.keys(formData).map(name => ({
    name,
    value: formData[name],
  }));

  await window.$.ajax({
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    url: `${HUBSPOT_URL}/${HUBSPOT_PORTAL_ID}/${HUBSPOT_SEND_MESSAGE_FORM_ID}`,
    data: JSON.stringify({
      submittedAt: +new Date(),
      fields,
      context: {
        pageUri: pageInfo.url,
        pageName: pageInfo.name,
      },
    }),
  });

  return true;
}
